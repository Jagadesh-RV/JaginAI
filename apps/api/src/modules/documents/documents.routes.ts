import { Router } from 'express';
import multer from 'multer';
import { z } from 'zod';
import { documentsController } from './documents.controller';
import { validate } from '../../middleware/validate';
import { PaginationQuerySchema } from '@jagin/types';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Example of querying with validation
const GetDocumentsSchema = z.object({
  query: PaginationQuerySchema,
});

router.post('/upload', upload.single('file'), (req, res) => documentsController.upload(req, res));
router.get('/', validate(GetDocumentsSchema), (req, res) => documentsController.getAll(req, res));

export { router as documentsRouter };

export { router as documentsRouter };
