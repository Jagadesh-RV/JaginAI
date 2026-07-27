import { Router } from 'express';
import { prisma } from '@jagin/database';

const router = Router();

router.get('/', async (_req, res) => {
  const collections = await prisma.collection.findMany();
  res.json(collections);
});

export default router;
