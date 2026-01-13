import { Permission } from './permission.model';
import { IPermission } from './permission.interface';
import { Types } from 'mongoose';
import { IFeature } from '../features/feature.interface';

export class PermissionService {
    /**
     * Cấp quyền truy cập feature cho user
     * @param userId - ID của user
     * @param featureId - ID của feature
     * @param grantedBy - ID của user cấp quyền (optional)
     */
    async grantPermission(userId: string, featureId: string, grantedBy?: string): Promise<IPermission> {
        const permission = await Permission.findOneAndUpdate(
            { user: userId, feature: featureId } as any,
            { isActive: true, grantedBy },
            { new: true, upsert: true }
        ).populate('feature');
        return permission;
    }

    /**
     * Cấp nhiều quyền cho user cùng lúc
     * @param userId - ID của user
     * @param featureIds - Mảng các ID của features
     * @param grantedBy - ID của user cấp quyền (optional)
     */
    async grantMultiplePermissions(
        userId: string, 
        featureIds: string[], 
        grantedBy?: string
    ): Promise<IPermission[]> {
        const permissions: IPermission[] = [];
        for (const featureId of featureIds) {
            const permission = await this.grantPermission(userId, featureId, grantedBy);
            permissions.push(permission);
        }
        return permissions;
    }

    /**
     * Thu hồi quyền truy cập feature của user
     * @param userId - ID của user
     * @param featureId - ID của feature
     */
    async revokePermission(userId: string, featureId: string): Promise<IPermission | null> {
        return await Permission.findOneAndUpdate(
            { user: userId, feature: featureId } as any,
            { isActive: false },
            { new: true }
        );
    }

    /**
     * Thu hồi tất cả quyền của user
     * @param userId - ID của user
     */
    async revokeAllPermissions(userId: string): Promise<void> {
        await Permission.updateMany(
            { user: userId } as any,
            { isActive: false }
        );
    }

    /**
     * Kiểm tra user có quyền truy cập feature không
     * @param userId - ID của user
     * @param featureKey - Key của feature (hoặc featureId)
     */
    async hasPermission(userId: string, featureKey: string): Promise<boolean> {
        // Kiểm tra theo featureKey
        const permission = await Permission.findOne({
            user: userId,
            isActive: true
        } as any).populate({
            path: 'feature',
            match: { key: featureKey, isActive: true }
        });

        if (permission && permission.feature) {
            return true;
        }

        // Nếu không tìm thấy theo key, thử tìm theo ID
        if (Types.ObjectId.isValid(featureKey)) {
            const permissionById = await Permission.findOne({
                user: userId,
                feature: featureKey,
                isActive: true
            } as any);
            return !!permissionById;
        }

        return false;
    }

    /**
     * Lấy danh sách feature IDs mà user có quyền truy cập
     * @param userId - ID của user
     */
    async getUserPermissions(userId: string): Promise<string[]> {
        const permissions = await Permission.find({ 
            user: userId, 
            isActive: true 
        } as any).populate('feature');
        return permissions
            .filter(p => p.feature)
            .map(p => (p.feature as any)._id.toString());
    }
    
    /**
     * Lấy danh sách đầy đủ các features mà user có quyền truy cập
     * @param userId - ID của user
     */
    async getUserFeatures(userId: string): Promise<IFeature[]> {
        const permissions = await Permission.find({ 
            user: userId, 
            isActive: true 
        } as any).populate({
            path: 'feature',
            match: { isActive: true }
        });

        const features: IFeature[] = [];
        for (const perm of permissions) {
            if (perm.feature) {
                features.push(perm.feature as unknown as IFeature);
            }
        }
        return features;
    }

    /**
     * Lấy danh sách users có quyền truy cập một feature cụ thể
     * @param featureId - ID của feature
     */
    async getUsersByFeature(featureId: string): Promise<any[]> {
        const permissions = await Permission.find({
            feature: featureId,
            isActive: true
        } as any).populate('user');
        return permissions.map(p => p.user);
    }

    /**
     * Lấy tất cả permissions của user (bao gồm cả inactive)
     * @param userId - ID của user
     */
    async getAllUserPermissions(userId: string): Promise<IPermission[]> {
        return await Permission.find({ user: userId } as any)
            .populate('feature')
            .populate('grantedBy', 'username email')
            .sort({ createdAt: -1 });
    }

    /**
     * Lấy chi tiết một permission cụ thể
     * @param userId - ID của user
     * @param featureId - ID của feature
     */
    async getPermissionDetail(userId: string, featureId: string): Promise<IPermission | null> {
        return await Permission.findOne({
            user: userId,
            feature: featureId
        } as any)
        .populate('feature')
        .populate('grantedBy', 'username email');
    }

    /**
     * Xóa hoàn toàn permission (không khuyến khích - nên dùng revoke thay vì delete)
     * @param userId - ID của user
     * @param featureId - ID của feature
     */
    async deletePermission(userId: string, featureId: string): Promise<boolean> {
        const result = await Permission.deleteOne({
            user: userId,
            feature: featureId
        } as any);
        return result.deletedCount > 0;
    }

    /**
     * Xóa tất cả permissions của user (dùng khi xóa user)
     * @param userId - ID của user
     */
    async deleteAllUserPermissions(userId: string): Promise<void> {
        await Permission.deleteMany({ user: userId } as any);
    }

    /**
     * Lấy thống kê permissions
     */
    async getPermissionStats(): Promise<{
        totalPermissions: number;
        activePermissions: number;
        inactivePermissions: number;
    }> {
        const total = await Permission.countDocuments();
        const active = await Permission.countDocuments({ isActive: true });
        return {
            totalPermissions: total,
            activePermissions: active,
            inactivePermissions: total - active
        };
    }
}

export const permissionService = new PermissionService();
