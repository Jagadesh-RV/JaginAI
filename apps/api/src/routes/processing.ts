import { Router } from 'express';
import { prisma } from '@jagin/database';

const router = Router();

router.get('/jobs', async (_req, res) => {
  const jobs = await prisma.processingJob.findMany({ include: { documentVersion: true } });
  res.json(jobs);
});

export default router;
