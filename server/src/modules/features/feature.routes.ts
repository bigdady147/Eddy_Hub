import { Router } from 'express';
import { getFeatures, createFeature } from './feature.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticate, getFeatures);
router.post('/', authenticate, authorize(['admin']), createFeature);

export default router;
