import { Router } from 'express';
import { register, login, getMe, forgotPassword, resetPassword } from './auth.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from './auth.validation';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
router.put('/reset-password/:resetToken', validate(resetPasswordSchema), resetPassword);
router.get('/me', authenticate, getMe);

export default router;
