import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    fullName: { type: String, default: '' },
    avatar: { type: String, default: '' },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
}, {
    timestamps: true
});

export const User = model<IUser>('User', userSchema);
