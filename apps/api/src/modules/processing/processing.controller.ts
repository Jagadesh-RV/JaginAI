import { Request, Response } from 'express';
import { processingService } from './processing.service';

export class ProcessingController {
  async getJobs(req: Request, res: Response) {
    const jobs = await processingService.getAllJobs();
    res.json(jobs);
  }
}

export const processingController = new ProcessingController();
