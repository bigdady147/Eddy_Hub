import { Request, Response } from 'express';
import { permissionService } from './permission.service';

export class PermissionController {
    /**
     * Cấp quyền cho user
     * POST /api/permissions/grant
     * Body: { userId, featureId, grantedBy? }
     */
    async grantPermission(req: Request, res: Response): Promise<void> {
        try {
            const { userId, featureId, grantedBy } = req.body;
            
            if (!userId || !featureId) {
                res.status(400).json({ 
                    success: false, 
                    message: 'userId và featureId là bắt buộc' 
                });
                return;
            }

            const permission = await permissionService.grantPermission(userId, featureId, grantedBy);
            res.status(200).json({ 
                success: true, 
                data: permission,
                message: 'Cấp quyền thành công' 
            });
        } catch (error: any) {
            res.status(500).json({ 
                success: false, 
                message: error.message || 'Lỗi khi cấp quyền' 
            });
        }
    }

    /**
     * Cấp nhiều quyền cho user
     * POST /api/permissions/grant-multiple
     * Body: { userId, featureIds: string[], grantedBy? }
     */
    async grantMultiplePermissions(req: Request, res: Response): Promise<void> {
        try {
            const { userId, featureIds, grantedBy } = req.body;
            
            if (!userId || !featureIds || !Array.isArray(featureIds)) {
                res.status(400).json({ 
                    success: false, 
                    message: 'userId và featureIds (array) là bắt buộc' 
                });
                return;
            }

            const permissions = await permissionService.grantMultiplePermissions(userId, featureIds, grantedBy);
            res.status(200).json({ 
                success: true, 
                data: permissions,
                message: `Cấp ${permissions.length} quyền thành công` 
            });
        } catch (error: any) {
            res.status(500).json({ 
                success: false, 
                message: error.message || 'Lỗi khi cấp nhiều quyền' 
            });
        }
    }

    /**
     * Thu hồi quyền của user
     * POST /api/permissions/revoke
     * Body: { userId, featureId }
     */
    async revokePermission(req: Request, res: Response): Promise<void> {
        try {
            const { userId, featureId } = req.body;
            
            if (!userId || !featureId) {
                res.status(400).json({ 
                    success: false, 
                    message: 'userId và featureId là bắt buộc' 
                });
                return;
            }

            const permission = await permissionService.revokePermission(userId, featureId);
            res.status(200).json({ 
                success: true, 
                data: permission,
                message: 'Thu hồi quyền thành công' 
            });
        } catch (error: any) {
            res.status(500).json({ 
                success: false, 
                message: error.message || 'Lỗi khi thu hồi quyền' 
            });
        }
    }

    /**
     * Thu hồi tất cả quyền của user
     * POST /api/permissions/revoke-all
     * Body: { userId }
     */
    async revokeAllPermissions(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.body;
            
            if (!userId) {
                res.status(400).json({ 
                    success: false, 
                    message: 'userId là bắt buộc' 
                });
                return;
            }

            await permissionService.revokeAllPermissions(userId);
            res.status(200).json({ 
                success: true, 
                message: 'Thu hồi tất cả quyền thành công' 
            });
        } catch (error: any) {
            res.status(500).json({ 
                success: false, 
                message: error.message || 'Lỗi khi thu hồi tất cả quyền' 
            });
        }
    }

    /**
     * Kiểm tra user có quyền không
     * GET /api/permissions/check/:userId/:featureKey
     */
    async hasPermission(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.userId as string;
            const featureKey = req.params.featureKey as string;
            
            if (!userId || !featureKey) {
                res.status(400).json({ 
                    success: false, 
                    message: 'userId và featureKey là bắt buộc' 
                });
                return;
            }

            const hasPermission = await permissionService.hasPermission(userId, featureKey);
            res.status(200).json({ 
                success: true, 
                data: { hasPermission },
                message: hasPermission ? 'User có quyền truy cập' : 'User không có quyền truy cập' 
            });
        } catch (error: any) {
            res.status(500).json({ 
                success: false, 
                message: error.message || 'Lỗi khi kiểm tra quyền' 
            });
        }
    }

    /**
     * Lấy danh sách quyền của user
     * GET /api/permissions/user/:userId
     */
    async getUserPermissions(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.userId as string;
            
            if (!userId) {
                res.status(400).json({ 
                    success: false, 
                    message: 'userId là bắt buộc' 
                });
                return;
            }

            const permissions = await permissionService.getUserPermissions(userId);
            res.status(200).json({ 
                success: true, 
                data: permissions 
            });
        } catch (error: any) {
            res.status(500).json({ 
                success: false, 
                message: error.message || 'Lỗi khi lấy danh sách quyền' 
            });
        }
    }

    /**
     * Lấy danh sách features của user
     * GET /api/permissions/user/:userId/features
     */
    async getUserFeatures(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.userId as string;
            
            if (!userId) {
                res.status(400).json({ 
                    success: false, 
                    message: 'userId là bắt buộc' 
                });
                return;
            }

            const features = await permissionService.getUserFeatures(userId);
            res.status(200).json({ 
                success: true, 
                data: features 
            });
        } catch (error: any) {
            res.status(500).json({ 
                success: false, 
                message: error.message || 'Lỗi khi lấy danh sách features' 
            });
        }
    }

    /**
     * Lấy danh sách users có quyền truy cập feature
     * GET /api/permissions/feature/:featureId/users
     */
    async getUsersByFeature(req: Request, res: Response): Promise<void> {
        try {
            const featureId = req.params.featureId as string;
            
            if (!featureId) {
                res.status(400).json({ 
                    success: false, 
                    message: 'featureId là bắt buộc' 
                });
                return;
            }

            const users = await permissionService.getUsersByFeature(featureId);
            res.status(200).json({ 
                success: true, 
                data: users 
            });
        } catch (error: any) {
            res.status(500).json({ 
                success: false, 
                message: error.message || 'Lỗi khi lấy danh sách users' 
            });
        }
    }

    /**
     * Lấy tất cả permissions của user (bao gồm inactive)
     * GET /api/permissions/user/:userId/all
     */
    async getAllUserPermissions(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.userId as string;
            
            if (!userId) {
                res.status(400).json({ 
                    success: false, 
                    message: 'userId là bắt buộc' 
                });
                return;
            }

            const permissions = await permissionService.getAllUserPermissions(userId);
            res.status(200).json({ 
                success: true, 
                data: permissions 
            });
        } catch (error: any) {
            res.status(500).json({ 
                success: false, 
                message: error.message || 'Lỗi khi lấy tất cả permissions' 
            });
        }
    }

    /**
     * Lấy chi tiết permission
     * GET /api/permissions/:userId/:featureId
     */
    async getPermissionDetail(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.userId as string;
            const featureId = req.params.featureId as string;
            
            if (!userId || !featureId) {
                res.status(400).json({ 
                    success: false, 
                    message: 'userId và featureId là bắt buộc' 
                });
                return;
            }

            const permission = await permissionService.getPermissionDetail(userId, featureId);
            
            if (!permission) {
                res.status(404).json({ 
                    success: false, 
                    message: 'Không tìm thấy permission' 
                });
                return;
            }

            res.status(200).json({ 
                success: true, 
                data: permission 
            });
        } catch (error: any) {
            res.status(500).json({ 
                success: false, 
                message: error.message || 'Lỗi khi lấy chi tiết permission' 
            });
        }
    }

    /**
     * Xóa permission
     * DELETE /api/permissions/:userId/:featureId
     */
    async deletePermission(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.userId as string;
            const featureId = req.params.featureId as string;
            
            if (!userId || !featureId) {
                res.status(400).json({ 
                    success: false, 
                    message: 'userId và featureId là bắt buộc' 
                });
                return;
            }

            const deleted = await permissionService.deletePermission(userId, featureId);
            
            if (!deleted) {
                res.status(404).json({ 
                    success: false, 
                    message: 'Không tìm thấy permission để xóa' 
                });
                return;
            }

            res.status(200).json({ 
                success: true, 
                message: 'Xóa permission thành công' 
            });
        } catch (error: any) {
            res.status(500).json({ 
                success: false, 
                message: error.message || 'Lỗi khi xóa permission' 
            });
        }
    }

    /**
     * Lấy thống kê permissions
     * GET /api/permissions/stats
     */
    async getPermissionStats(req: Request, res: Response): Promise<void> {
        try {
            const stats = await permissionService.getPermissionStats();
            res.status(200).json({ 
                success: true, 
                data: stats 
            });
        } catch (error: any) {
            res.status(500).json({ 
                success: false, 
                message: error.message || 'Lỗi khi lấy thống kê' 
            });
        }
    }
}

export const permissionController = new PermissionController();
