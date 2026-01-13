import { Schema, model } from 'mongoose';
import { IPermission } from './permission.interface';

const permissionSchema = new Schema<IPermission>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    feature: { type: Schema.Types.ObjectId, ref: 'Feature', required: true },
    isActive: { type: Boolean, default: true },
    grantedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});

// Prevent duplicate permissions for the same user and feature
permissionSchema.index({ user: 1, feature: 1 }, { unique: true });

export const Permission = model<IPermission>('Permission', permissionSchema);
