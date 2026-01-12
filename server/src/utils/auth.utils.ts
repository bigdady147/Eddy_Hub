import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export const comparePassword = async (rawString: string, hashedString: string): Promise<boolean> => {
    return bcrypt.compare(rawString, hashedString);
};

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' });
};

export const verifyToken = (token: string): any => {
    return jwt.verify(token, config.jwtSecret);
};
