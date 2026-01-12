import winston from 'winston';
import 'winston-mongodb';
import { config } from '../config';

const { combine, timestamp, json, printf, colorize } = winston.format;

// Custom format for console logging
const consoleFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

export const Logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: combine(timestamp(), json()),
  defaultMeta: { service: 'eddy-tools-api' },
  transports: [
    // 1. Log to Console (Colored)
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        consoleFormat
      ),
    }),
    // 2. Log to MongoDB
    new winston.transports.MongoDB({
      level: 'info',
      db: config.mongoUri,
      options: {
        useUnifiedTopology: true,
      },
      collection: 'system_logs',
      format: combine(timestamp(), json()),
      storeHost: true,
      expireAfterSeconds: 60 * 60 * 24 * 30, // Retention 30 days
      leaveConnectionOpen: false,
    }),
  ],
});
