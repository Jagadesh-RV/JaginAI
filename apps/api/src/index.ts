import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { Queue } from 'bullmq';
import Redis from 'ioredis';
import { logger } from '@jagin/logger';
import { env } from '@jagin/config';
import { prisma } from '@jagin/database';
import { storage } from '@jagin/storage';

const connection = new Redis(env.REDIS_URL || 'redis://localhost:6379');
const documentQueue = new Queue('DocumentProcessing', { connection });

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.get('/', (_req, res) => {
  res.json({ status: 'ok' });
});

// Mock user for dev
const MOCK_USER_ID = '00000000-0000-0000-0000-000000000000';
const MOCK_ORG_ID = '00000000-0000-0000-0000-000000000000';
const MOCK_WORKSPACE_ID = '00000000-0000-0000-0000-000000000000';

app.post('/documents/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    // Validate mime type (stub)
    const allowedTypes = ['application/pdf', 'text/plain', 'text/markdown'];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ error: 'Invalid file type' });
    }

    // 1. Ensure mock records exist
    let org = await prisma.organization.findUnique({ where: { id: MOCK_ORG_ID } });
    if (!org) {
      org = await prisma.organization.create({ data: { id: MOCK_ORG_ID, name: 'Dev Org' } });
      await prisma.workspace.create({ data: { id: MOCK_WORKSPACE_ID, name: 'Default', organizationId: MOCK_ORG_ID } });
      await prisma.user.create({ data: { id: MOCK_USER_ID, email: 'admin@jagin.ai', name: 'Admin', organizationId: MOCK_ORG_ID } });
    }

    // 2. Upload to storage
    const key = `docs/${Date.now()}-${file.originalname}`;
    await storage.upload(key, file.buffer, file.mimetype);

    // 3. Create Document & Version
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
          }
        }
      },
      include: { versions: true }
    });

    const docVersion = document.versions[0];

    // 4. Create ProcessingJob
    const job = await prisma.processingJob.create({
      data: {
        documentVersionId: docVersion.id,
        status: 'QUEUED'
      }
    });

    // 5. Queue job to BullMQ
    await documentQueue.add('process', { documentVersionId: docVersion.id });

    res.json({ document, job });
  } catch (error) {
    logger.error({ err: error }, 'Upload failed');
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/documents', async (_req, res) => {
  const docs = await prisma.document.findMany({ include: { versions: true } });
  res.json(docs);
});

app.get('/processing/jobs', async (_req, res) => {
  const jobs = await prisma.processingJob.findMany({ include: { documentVersion: true } });
  res.json(jobs);
});

app.get('/collections', async (_req, res) => {
  const collections = await prisma.collection.findMany();
  res.json(collections);
});

const PORT = env.PORT_API || 4000;
app.listen(PORT, () => {
  logger.info(`API running on port ${PORT}`);
});
