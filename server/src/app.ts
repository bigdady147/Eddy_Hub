import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { requestLogger } from './middlewares/logger.middleware';

const app: Express = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
// app.use(morgan('dev')); // Replaced by custom logger
app.use(requestLogger);

// Basic Route
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Eddy Tools API');
});

import authRoutes from './modules/auth/auth.routes';
import featureRoutes from './modules/features/feature.routes';
import { featureRequestRoutes } from './modules/feature-requests';

console.log('=== Routes Debug ===');
console.log('Auth Routes:', typeof authRoutes);
console.log('Feature Routes:', typeof featureRoutes);
console.log('Feature Request Routes:', typeof featureRequestRoutes);
console.log('Feature Request Routes is Router?', featureRequestRoutes?.name === 'router');

import { errorHandler } from './middlewares/error.middleware';

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/features', featureRoutes);
app.use('/api/v1/feature-requests', featureRequestRoutes);

console.log('✅ All routes registered');

// Global Error Handler
app.use(errorHandler);




export default app;
