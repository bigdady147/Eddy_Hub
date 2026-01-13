import { Router } from 'express';
import { permissionController } from './permission.controller';

const router = Router();

// Grant & Revoke permissions
router.post('/grant', permissionController.grantPermission.bind(permissionController));
router.post('/grant-multiple', permissionController.grantMultiplePermissions.bind(permissionController));
router.post('/revoke', permissionController.revokePermission.bind(permissionController));
router.post('/revoke-all', permissionController.revokeAllPermissions.bind(permissionController));

// Check permission
router.get('/check/:userId/:featureKey', permissionController.hasPermission.bind(permissionController));

// Get permissions
router.get('/user/:userId', permissionController.getUserPermissions.bind(permissionController));
router.get('/user/:userId/features', permissionController.getUserFeatures.bind(permissionController));
router.get('/user/:userId/all', permissionController.getAllUserPermissions.bind(permissionController));
router.get('/feature/:featureId/users', permissionController.getUsersByFeature.bind(permissionController));
router.get('/:userId/:featureId', permissionController.getPermissionDetail.bind(permissionController));

// Delete permission
router.delete('/:userId/:featureId', permissionController.deletePermission.bind(permissionController));

// Stats
router.get('/stats', permissionController.getPermissionStats.bind(permissionController));

export default router;
