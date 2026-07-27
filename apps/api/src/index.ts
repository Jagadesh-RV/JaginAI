import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { logger, httpLogger } from '@jagin/logger';
import { env } from '@jagin/config';

import { documentsRouter } from './modules/documents/documents.routes';
import { processingRouter } from './modules/processing/processing.routes';
import { collectionsRouter } from './modules/collections/collections.routes';
import { errorHandler } from './middleware/error-handler';
import { requireAuth } from './middleware/auth';

const app = express();
app.use(cors());
app.use(express.json());
app.use(httpLogger);

app.get('/', (_req, res) => {
  res.json({ status: 'ok' });
});

// Protect API routes
app.use('/documents', requireAuth, documentsRouter);
app.use('/processing', requireAuth, processingRouter);
app.use('/collections', requireAuth, collectionsRouter);

app.use(errorHandler);

const PORT = env.PORT_API || 4000;
app.listen(PORT, () => {
  logger.info(`API running on port ${PORT}`);
});
