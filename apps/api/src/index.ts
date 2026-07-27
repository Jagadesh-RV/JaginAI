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
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(express.json());
app.use(httpLogger);

/**
 * @swagger
 * /:
 *   get:
 *     summary: API root
 *     tags: [General]
 *     responses:
 *       200:
 *         description: API is running
 */
app.get('/', (_req, res) => {
  res.json({ status: 'ok' });
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [General]
 *     responses:
 *       200:
 *         description: API health status
 *       503:
 *         description: API is unhealthy
 */
app.get('/health', async (_req, res) => {
  try {
    // Check database connectivity
    const { prisma } = await import('@jagin/database');
    await prisma.$queryRaw`SELECT 1`;
    
    res.status(200).json({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: 'connected',
    });
  } catch (error) {
    logger.error('Health check failed', error);
    res.status(503).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
    });
  }
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
