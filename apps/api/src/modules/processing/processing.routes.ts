import { Router } from 'express';
import { processingController } from './processing.controller';

const router = Router();

router.get('/jobs', (req, res) => processingController.getJobs(req, res));

export { router as processingRouter };
