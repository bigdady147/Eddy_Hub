import { Document } from 'mongoose';

export interface IFeature extends Document {
    name: {
        vi: string;
        en: string;
    };
    key: string;
    description: {
        vi: string;
        en: string;
    };
    icon: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
