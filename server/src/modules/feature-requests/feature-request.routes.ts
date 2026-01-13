import { Router } from 'express';
import { featureRequestController } from './feature-request.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { isAdmin } from '../../middlewares/role.middleware';

const router = Router();

// User routes (require authentication)
router.post('/bulk', authenticate, featureRequestController.submitBulkRequests.bind(featureRequestController));
router.get('/my-requests', authenticate, featureRequestController.getMyRequests.bind(featureRequestController));
router.delete('/:id', authenticate, featureRequestController.cancelRequest.bind(featureRequestController));

// Admin routes (require authentication + admin role)
router.get('/pending', authenticate, isAdmin, featureRequestController.getPendingRequests.bind(featureRequestController));
router.get('/stats', authenticate, isAdmin, featureRequestController.getRequestStats.bind(featureRequestController));
router.get('/', authenticate, isAdmin, featureRequestController.getAllRequests.bind(featureRequestController));
router.patch('/:id/approve', authenticate, isAdmin, featureRequestController.approveRequest.bind(featureRequestController));
router.patch('/:id/reject', authenticate, isAdmin, featureRequestController.rejectRequest.bind(featureRequestController));

export default router;
