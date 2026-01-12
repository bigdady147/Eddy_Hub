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

import { errorHandler } from './middlewares/error.middleware';

// API Routes
app.use('/api/v1/auth', authRoutes);

// Global Error Handler
app.use(errorHandler);



export default app;
