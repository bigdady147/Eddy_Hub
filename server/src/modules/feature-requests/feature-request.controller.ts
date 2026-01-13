import { Request, Response } from 'express';
import { featureRequestService } from './feature-request.service';

export class FeatureRequestController {
    /**
     * Submit bulk feature requests
     * POST /api/feature-requests/bulk
     * Body: { featureIds: string[] }
     */
    async submitBulkRequests(req: Request, res: Response): Promise<void> {
        try {
            const userId = (req as any).user.id;
            const { featureIds } = req.body;

            console.log('=== Bulk Request Debug ===');
            console.log('User ID:', userId);
            console.log('Feature IDs:', featureIds);
            console.log('Body:', req.body);

            if (!featureIds || !Array.isArray(featureIds) || featureIds.length === 0) {
                res.status(400).json({
                    success: false,
                    message: 'featureIds array is required'
                });
                return;
            }

            const result = await featureRequestService.submitBulkRequests(userId, featureIds);

            console.log('Result:', result);

            res.status(200).json({
                success: true,
                data: result,
                message: 'Feature requests submitted successfully'
            });
        } catch (error: any) {
            console.error('=== Bulk Request Error ===');
            console.error(error);
            res.status(500).json({
                success: false,
                message: error.message || 'Error submitting feature requests'
            });
        }
    }

    /**
     * Get user's own requests
     * GET /api/feature-requests/my-requests
     */
    async getMyRequests(req: Request, res: Response): Promise<void> {
        try {
            const userId = (req as any).user.id;
            const requests = await featureRequestService.getMyRequests(userId);

            res.status(200).json({
                success: true,
                data: requests
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message || 'Error fetching requests'
            });
        }
    }

    /**
     * Cancel a pending request
     * DELETE /api/feature-requests/:id
     */
    async cancelRequest(req: Request, res: Response): Promise<void> {
        try {
            const userId = (req as any).user.id;
            const requestId = req.params.id as string;

            const request = await featureRequestService.cancelRequest(requestId, userId);

            res.status(200).json({
                success: true,
                data: request,
                message: 'Request cancelled successfully'
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message || 'Error cancelling request'
            });
        }
    }

    /**
     * Get all requests (admin)
     * GET /api/feature-requests
     */
    async getAllRequests(req: Request, res: Response): Promise<void> {
        try {
            const { status, limit, page } = req.query;

            const filters = {
                status: status as string,
                limit: limit ? parseInt(limit as string) : undefined,
                page: page ? parseInt(page as string) : undefined
            };

            const requests = await featureRequestService.getAllRequests(filters);

            res.status(200).json({
                success: true,
                data: requests
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message || 'Error fetching requests'
            });
        }
    }

    /**
     * Get pending requests (admin)
     * GET /api/feature-requests/pending
     */
    async getPendingRequests(req: Request, res: Response): Promise<void> {
        try {
            const requests = await featureRequestService.getPendingRequests();

            res.status(200).json({
                success: true,
                data: requests
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message || 'Error fetching pending requests'
            });
        }
    }

    /**
     * Approve a request (admin)
     * PATCH /api/feature-requests/:id/approve
     * Body: { responseMessage?: string }
     */
    async approveRequest(req: Request, res: Response): Promise<void> {
        try {
            const adminId = (req as any).user.id;
            const requestId = req.params.id as string;
            const { responseMessage } = req.body;

            const request = await featureRequestService.approveRequest(requestId, adminId, responseMessage);

            res.status(200).json({
                success: true,
                data: request,
                message: 'Request approved and permission granted'
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message || 'Error approving request'
            });
        }
    }

    /**
     * Reject a request (admin)
     * PATCH /api/feature-requests/:id/reject
     * Body: { responseMessage?: string }
     */
    async rejectRequest(req: Request, res: Response): Promise<void> {
        try {
            const adminId = (req as any).user.id;
            const requestId = req.params.id as string;
            const { responseMessage } = req.body;

            const request = await featureRequestService.rejectRequest(requestId, adminId, responseMessage);

            res.status(200).json({
                success: true,
                data: request,
                message: 'Request rejected'
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message || 'Error rejecting request'
            });
        }
    }

    /**
     * Get request statistics (admin)
     * GET /api/feature-requests/stats
     */
    async getRequestStats(req: Request, res: Response): Promise<void> {
        try {
            const stats = await featureRequestService.getRequestStats();

            res.status(200).json({
                success: true,
                data: stats
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message || 'Error fetching statistics'
            });
        }
    }
}

export const featureRequestController = new FeatureRequestController();
