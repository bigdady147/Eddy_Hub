import { Document, Types } from 'mongoose';

export interface IFeatureRequest extends Document {
    user: Types.ObjectId | string;
    feature: Types.ObjectId | string;
    status: 'pending' | 'approved' | 'rejected';
    requestMessage?: string;
    responseMessage?: string;
    requestedAt: Date;
    reviewedBy?: Types.ObjectId | string;
    reviewedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
