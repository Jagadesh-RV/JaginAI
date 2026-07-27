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

/**
 * @swagger
 * /documents/upload:
 *   post:
 *     summary: Upload a document
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Document successfully uploaded
 */
router.post('/upload', upload.single('file'), (req, res) => documentsController.upload(req, res));

/**
 * @swagger
 * /documents:
 *   get:
 *     summary: Retrieve a list of documents
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *     responses:
 *       200:
 *         description: A list of documents
 */
router.get('/', validate(GetDocumentsSchema), (req, res) => documentsController.getAll(req, res));

export { router as documentsRouter };

