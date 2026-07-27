import { Router } from 'express';
import { collectionsController } from './collections.controller';

const router = Router();

router.get('/', (req, res) => collectionsController.getAll(req, res));

export { router as collectionsRouter };
