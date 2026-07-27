import { Request, Response } from 'express';
import { documentsService } from './documents.service';

export class DocumentsController {
  async upload(req: Request, res: Response) {
    const file = req.file;
    if (!file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    // Validate mime type
    const allowedTypes = ['application/pdf', 'text/plain', 'text/markdown'];
    if (!allowedTypes.includes(file.mimetype)) {
      res.status(400).json({ error: 'Invalid file type' });
      return;
    }

    const user = req.user!;
    const result = await documentsService.uploadAndCreateDocument(file, user.id, user.orgId);
    res.json(result);
  }

  async getAll(req: Request, res: Response) {
    const user = req.user!;
    const docs = await documentsService.getAllDocuments(user.orgId);
    res.json(docs);
  }
}

export const documentsController = new DocumentsController();
