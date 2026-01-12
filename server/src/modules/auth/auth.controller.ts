import { Request, Response, NextFunction } from 'express';
import { User } from '../users/user.model';
import { hashPassword, comparePassword, generateToken } from '../../utils/auth.utils';
import crypto from 'crypto';
import { emailService } from '../services/email.service';
import { ApiError } from '../../core/ApiError';
import { ApiResponse } from '../../core/ApiResponse';
import { asyncHandler } from '../../core/asyncHandler';


export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password, fullName } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Username or Email already exists' });
        }

        const hashedPassword = await hashPassword(password);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            fullName
        });

        const token = generateToken({ id: newUser._id, role: newUser.role });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                token,
                user: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    fullName: newUser.fullName,
                    role: newUser.role
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user || !user.password) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = generateToken({ id: user._id, role: user.role });

        res.status(200).json({
            success: true,
            data: {
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    fullName: user.fullName,
                    role: user.role,
                    avatar: user.avatar
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // req.user is populated by middleware
        const userId = (req as any).user.id;
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};



export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
         throw new ApiError(404, 'User not found with this email');
    }

    // Generate Reset Token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and save to DB
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await user.save();

    // Create Reset URL
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    const message = `
        <h1>You have requested a password reset</h1>
        <p>Please go to this link to reset your password:</p>
        <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
        <p class="small">This link expires in 10 minutes.</p>
    `;

    try {
        await emailService.sendEmail(user.email, 'Password Reset Request', message);
        res.status(200).json(new ApiResponse(200, { data: 'Email sent' }, 'Email sent'));
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        throw new ApiError(500, 'Email could not be sent');
    }
});

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { resetToken } = req.params;
    
    if (!resetToken || typeof resetToken !== 'string') {
        throw new ApiError(400, 'Invalid reset token');
    }

    const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        throw new ApiError(400, 'Invalid Token or Token Expired');
    }

    // Set new password
    user.password = await hashPassword(req.body.password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json(new ApiResponse(200, { data: 'Password updated' }, 'Password updated successfully'));
});
