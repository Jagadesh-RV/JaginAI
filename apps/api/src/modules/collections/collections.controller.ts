import { Request, Response } from 'express';
import { logger } from '@jagin/logger';
import { collectionsService } from './collections.service';

export class CollectionsController {
  async getAll(req: Request, res: Response) {
    try {
      const collections = await collectionsService.getAllCollections();
      res.json(collections);
    } catch (error) {
      logger.error({ err: error }, 'Failed to get collections');
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export const collectionsController = new CollectionsController();
