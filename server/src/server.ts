import mongoose from 'mongoose';
import app from './app';
import { config } from './config';

const startServer = async () => {
    try {
        await mongoose.connect(config.mongoUri);
        console.log('✅ MongoDB connected successfully');

        app.listen(config.port, () => {
            console.log(`🚀 Server running on http://localhost:${config.port}`);
        });
    } catch (error) {
        console.error('❌ Database connection failed', error);
        process.exit(1);
    }
};

startServer();
