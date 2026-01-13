import { Schema, model } from 'mongoose';
import { IFeature } from './feature.interface';

const featureSchema = new Schema<IFeature>({
    name: {
        vi: { type: String, required: true },
        en: { type: String, required: true }
    },
    key: { type: String, required: true, unique: true, trim: true },
    description: {
        vi: { type: String, default: '' },
        en: { type: String, default: '' }
    },
    icon: { type: String, required: true },
    isActive: { type: Boolean, default: true },
}, {
    timestamps: true
});

export const Feature = model<IFeature>('Feature', featureSchema);
