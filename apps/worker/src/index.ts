import { Worker, Job } from 'bullmq';
import Redis from 'ioredis';
import { logger } from '@jagin/logger';
import { env } from '@jagin/config';
import { prisma } from '@jagin/database';

const connection = new Redis(env.REDIS_URL || 'redis://localhost:6379');

const worker = new Worker('DocumentProcessing', async (job: Job) => {
  const { documentVersionId } = job.data;
  
  logger.info({ documentVersionId }, 'Processing job started');

  await prisma.processingJob.update({
    where: { documentVersionId },
    data: { status: 'PROCESSING', startedAt: new Date() }
  });

  try {
    const docVersion = await prisma.documentVersion.findUnique({
      where: { id: documentVersionId }
    });

    if (!docVersion) throw new Error('Document version not found');

    // 1. OCR (Stub)
    await prisma.processingJob.update({
      where: { documentVersionId },
      data: { ocrStatus: 'COMPLETED' }
    });

    // 2. Parser (Stub)
    const content = 'Extracted text content from the document...';
    await prisma.processingJob.update({
      where: { documentVersionId },
      data: { parseStatus: 'COMPLETED' }
    });

    // 3. Semantic Chunker (Stub)
    // Creating one simple chunk for demonstration
    await prisma.chunk.create({
      data: {
        documentVersionId: docVersion.id,
        content: content,
        section: 'Introduction',
        tokenCount: 15,
        position: 0,
      }
    });

    await prisma.processingJob.update({
      where: { documentVersionId },
      data: { chunkStatus: 'COMPLETED' }
    });

    // Mark as completed
    await prisma.processingJob.update({
      where: { documentVersionId },
      data: { status: 'COMPLETED', completedAt: new Date() }
    });

    // Audit Log
    await prisma.auditLog.create({
      data: {
        action: 'DOCUMENT_PROCESSED',
        entity: 'DocumentVersion',
        entityId: docVersion.id,
      }
    });

    logger.info({ documentVersionId }, 'Processing job completed');
  } catch (error) {
    logger.error({ err: error, documentVersionId }, 'Processing job failed');
    await prisma.processingJob.update({
      where: { documentVersionId },
      data: { status: 'FAILED', error: (error as Error).message }
    });
    throw error;
  }
}, { connection });

worker.on('failed', (job, err) => {
  logger.error({ jobId: job?.id, err }, 'Job failed');
});

logger.info('Worker started and listening to DocumentProcessing queue');
