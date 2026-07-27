import express from 'express';
import cors from 'cors';
import { logger } from '@jagin/logger';
import { env } from '@jagin/config';

import documentsRouter from './routes/documents';
import processingRouter from './routes/processing';
import collectionsRouter from './routes/collections';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/documents', documentsRouter);
app.use('/processing', processingRouter);
app.use('/collections', collectionsRouter);

const PORT = env.PORT_API || 4000;
app.listen(PORT, () => {
  logger.info(`API running on port ${PORT}`);
});
