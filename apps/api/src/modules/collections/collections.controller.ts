import { Request, Response } from 'express';
import { collectionsService } from './collections.service';

export class CollectionsController {
  async getAll(req: Request, res: Response) {
    const collections = await collectionsService.getAllCollections();
    res.json(collections);
  }
}

export const collectionsController = new CollectionsController();
