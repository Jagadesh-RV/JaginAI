import { Queue } from 'bullmq';
import Redis from 'ioredis';
import { env } from '@jagin/config';
import { prisma } from '@jagin/database';
import { storage } from '@jagin/storage';

const connection = new Redis(env.REDIS_URL || 'redis://localhost:6379');
const documentQueue = new Queue('DocumentProcessing', { connection });


export class DocumentsService {
  async uploadAndCreateDocument(file: Express.Multer.File, userId: string, orgId: string) {
    // Determine a Workspace for the organization
    // For simplicity, find the first workspace for the org, or create one.
    let workspace = await prisma.workspace.findFirst({ where: { organizationId: orgId } });
    if (!workspace) {
      workspace = await prisma.workspace.create({
        data: { name: 'Default Workspace', organizationId: orgId }
      });
    }

    // Upload to storage
    const key = `docs/${Date.now()}-${file.originalname}`;
    await storage.upload(key, file.buffer, file.mimetype);

    // Create Document & Version
    const document = await prisma.document.create({
      data: {
        title: file.originalname,
        workspaceId: workspace.id,
        versions: {
          create: {
            versionNumber: 1,
            uploadUserId: userId,
            originalFilename: file.originalname,
            mimeType: file.mimetype,
            fileSize: file.size,
            storageKey: key,
          },
        },
      },
      include: { versions: true },
    });

    const docVersion = document.versions[0];

    // Create ProcessingJob
    const job = await prisma.processingJob.create({
      data: {
        documentVersionId: docVersion.id,
        status: 'QUEUED',
      },
    });

    // Queue job to BullMQ
    await documentQueue.add('process', { documentVersionId: docVersion.id });

    return { document, job };
  }

  async getAllDocuments(orgId: string) {
    return prisma.document.findMany({ 
      where: { workspace: { organizationId: orgId } },
      include: { versions: true } 
    });
  }
}

export const documentsService = new DocumentsService();
