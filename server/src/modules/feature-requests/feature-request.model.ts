import { Schema, model } from 'mongoose';
import { IFeatureRequest } from './feature-request.interface';

const featureRequestSchema = new Schema<IFeatureRequest>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    feature: { type: Schema.Types.ObjectId, ref: 'Feature', required: true },
    status: { 
        type: String, 
        enum: ['pending', 'approved', 'rejected'], 
        default: 'pending',
        required: true
    },
    requestMessage: { type: String },
    responseMessage: { type: String },
    requestedAt: { type: Date, default: Date.now },
    reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    reviewedAt: { type: Date }
}, { 
    timestamps: true 
});

// Indexes for efficient queries
featureRequestSchema.index({ user: 1, feature: 1, status: 1 });
featureRequestSchema.index({ status: 1, requestedAt: -1 });
featureRequestSchema.index({ user: 1, status: 1 });

export const FeatureRequest = model<IFeatureRequest>('FeatureRequest', featureRequestSchema);
