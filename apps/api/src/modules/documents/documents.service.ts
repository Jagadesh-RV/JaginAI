import { Queue } from 'bullmq';
import Redis from 'ioredis';
import { env } from '@jagin/config';
import { prisma } from '@jagin/database';
import { storage } from '@jagin/storage';

const connection = new Redis(env.REDIS_URL || 'redis://localhost:6379');
const documentQueue = new Queue('DocumentProcessing', { connection });

// Mock constants for dev
const MOCK_USER_ID = '00000000-0000-0000-0000-000000000000';
const MOCK_ORG_ID = '00000000-0000-0000-0000-000000000000';
const MOCK_WORKSPACE_ID = '00000000-0000-0000-0000-000000000000';

export class DocumentsService {
  async ensureMockUser() {
    let org = await prisma.organization.findUnique({ where: { id: MOCK_ORG_ID } });
    if (!org) {
      org = await prisma.organization.create({ data: { id: MOCK_ORG_ID, name: 'Dev Org' } });
      await prisma.workspace.create({ data: { id: MOCK_WORKSPACE_ID, name: 'Default', organizationId: MOCK_ORG_ID } });
      await prisma.user.create({ data: { id: MOCK_USER_ID, email: 'admin@jagin.ai', name: 'Admin', organizationId: MOCK_ORG_ID } });
    }
  }

  async uploadAndCreateDocument(file: Express.Multer.File) {
    await this.ensureMockUser();

    // Upload to storage
    const key = `docs/${Date.now()}-${file.originalname}`;
    await storage.upload(key, file.buffer, file.mimetype);

    // Create Document & Version
    const document = await prisma.document.create({
      data: {
        title: file.originalname,
        workspaceId: MOCK_WORKSPACE_ID,
        versions: {
          create: {
            versionNumber: 1,
            uploadUserId: MOCK_USER_ID,
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

  async getAllDocuments() {
    return prisma.document.findMany({ include: { versions: true } });
  }
}

export const documentsService = new DocumentsService();
