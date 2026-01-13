import mongoose from 'mongoose';
import app from './app';
import { config } from './config';
import { featureService } from './modules/features/feature.service';

const startServer = async () => {
    try {
        await mongoose.connect(config.mongoUri);
        console.log('✅ MongoDB connected successfully');

        // Seed default features
        await featureService.seedFeatures();
        console.log('✅ Features seeded successfully');

        app.listen(config.port, () => {
            console.log(`🚀 Server running on http://localhost:${config.port}`);
        });
    } catch (error) {
        console.error('❌ Database connection failed', error);
        process.exit(1);
    }
};

startServer();
