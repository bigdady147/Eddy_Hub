import { FeatureRequest } from './feature-request.model';
import { IFeatureRequest } from './feature-request.interface';
import { permissionService } from '../permissions/permission.service';

class FeatureRequestService {
    /**
     * Submit bulk feature requests (from feature selection screen)
     */
    async submitBulkRequests(userId: string, featureIds: string[]): Promise<{ created: number; requests: IFeatureRequest[] }> {
        const requests: IFeatureRequest[] = [];
        
        for (const featureId of featureIds) {
            // Check if user already has permission
            const hasPermission = await permissionService.hasPermission(userId, featureId);
            if (hasPermission) continue;
            
            // Check if pending request already exists
            const existingRequest = await FeatureRequest.findOne({
                user: userId,
                feature: featureId,
                status: 'pending'
            } as any);
            
            if (existingRequest) {
                requests.push(existingRequest);
                continue;
            }
            
            // Create new request
            const request = await FeatureRequest.create({
                user: userId,
                feature: featureId,
                status: 'pending',
                requestedAt: new Date()
            });
            
            requests.push(request);
        }
        
        return {
            created: requests.length,
            requests
        };
    }

    /**
     * Get user's own requests
     */
    async getMyRequests(userId: string): Promise<IFeatureRequest[]> {
        return await FeatureRequest.find({ user: userId } as any)
            .populate('feature')
            .sort({ requestedAt: -1 });
    }

    /**
     * Cancel a pending request
     */
    async cancelRequest(requestId: string, userId: string): Promise<IFeatureRequest | null> {
        const request = await FeatureRequest.findOne({
            _id: requestId,
            user: userId,
            status: 'pending'
        } as any);

        if (!request) {
            throw new Error('Request not found or cannot be cancelled');
        }

        await request.deleteOne();
        return request;
    }

    /**
     * Get all requests (admin)
     */
    async getAllRequests(filters?: { status?: string; limit?: number; page?: number }): Promise<IFeatureRequest[]> {
        const query: any = {};
        
        if (filters?.status) {
            query.status = filters.status;
        }

        const limit = filters?.limit || 50;
        const page = filters?.page || 1;
        const skip = (page - 1) * limit;

        return await FeatureRequest.find(query)
            .populate('user', 'username email')
            .populate('feature')
            .populate('reviewedBy', 'username email')
            .sort({ requestedAt: -1 })
            .skip(skip)
            .limit(limit);
    }

    /**
     * Get pending requests only (admin)
     */
    async getPendingRequests(): Promise<IFeatureRequest[]> {
        return await FeatureRequest.find({ status: 'pending' } as any)
            .populate('user', 'username email')
            .populate('feature')
            .sort({ requestedAt: -1 });
    }

    /**
     * Approve a request (admin)
     */
    async approveRequest(requestId: string, adminId: string, responseMessage?: string): Promise<IFeatureRequest> {
        const request = await FeatureRequest.findById(requestId);
        
        if (!request) {
            throw new Error('Request not found');
        }

        if (request.status !== 'pending') {
            throw new Error('Only pending requests can be approved');
        }

        // Grant permission automatically
        await permissionService.grantPermission(
            request.user.toString(),
            request.feature.toString(),
            adminId
        );

        // Update request status
        request.status = 'approved';
        request.reviewedBy = adminId as any;
        request.reviewedAt = new Date();
        if (responseMessage) {
            request.responseMessage = responseMessage;
        }

        await request.save();
        return request;
    }

    /**
     * Reject a request (admin)
     */
    async rejectRequest(requestId: string, adminId: string, responseMessage?: string): Promise<IFeatureRequest> {
        const request = await FeatureRequest.findById(requestId);
        
        if (!request) {
            throw new Error('Request not found');
        }

        if (request.status !== 'pending') {
            throw new Error('Only pending requests can be rejected');
        }

        request.status = 'rejected';
        request.reviewedBy = adminId as any;
        request.reviewedAt = new Date();
        if (responseMessage) {
            request.responseMessage = responseMessage;
        }

        await request.save();
        return request;
    }

    /**
     * Get request statistics (admin)
     */
    async getRequestStats(): Promise<{ total: number; pending: number; approved: number; rejected: number }> {
        const [total, pending, approved, rejected] = await Promise.all([
            FeatureRequest.countDocuments(),
            FeatureRequest.countDocuments({ status: 'pending' } as any),
            FeatureRequest.countDocuments({ status: 'approved' } as any),
            FeatureRequest.countDocuments({ status: 'rejected' } as any)
        ]);

        return { total, pending, approved, rejected };
    }
}

export const featureRequestService = new FeatureRequestService();
export { FeatureRequestService };
