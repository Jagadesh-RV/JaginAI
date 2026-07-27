import { Request, Response } from 'express';
import { logger } from '@jagin/logger';
import { documentsService } from './documents.service';

export class DocumentsController {
  async upload(req: Request, res: Response) {
    try {
      const file = req.file;
      if (!file) return res.status(400).json({ error: 'No file uploaded' });

      // Validate mime type
      const allowedTypes = ['application/pdf', 'text/plain', 'text/markdown'];
      if (!allowedTypes.includes(file.mimetype)) {
        return res.status(400).json({ error: 'Invalid file type' });
      }

      const result = await documentsService.uploadAndCreateDocument(file);
      res.json(result);
    } catch (error) {
      logger.error({ err: error }, 'Upload failed');
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const docs = await documentsService.getAllDocuments();
      res.json(docs);
    } catch (error) {
      logger.error({ err: error }, 'Failed to get documents');
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export const documentsController = new DocumentsController();
