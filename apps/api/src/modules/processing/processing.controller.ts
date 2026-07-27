import { Request, Response } from 'express';
import { logger } from '@jagin/logger';
import { processingService } from './processing.service';

export class ProcessingController {
  async getJobs(req: Request, res: Response) {
    try {
      const jobs = await processingService.getAllJobs();
      res.json(jobs);
    } catch (error) {
      logger.error({ err: error }, 'Failed to get jobs');
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export const processingController = new ProcessingController();
