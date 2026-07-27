import { Router } from 'express';
import multer from 'multer';
import { documentsController } from './documents.controller';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), (req, res) => documentsController.upload(req, res));
router.get('/', (req, res) => documentsController.getAll(req, res));

export { router as documentsRouter };
