import { Document, Schema } from 'mongoose';

export interface IPermission extends Document {
    user: Schema.Types.ObjectId;
    feature: Schema.Types.ObjectId;
    isActive: boolean;
    grantedBy?: Schema.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}
