import { Request, Response, NextFunction } from 'express';
import { Logger } from '../core/Logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  // Log the request
  Logger.info(`Incoming Request: ${req.method} ${req.url}`, {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('user-agent'),
  });

  const start = Date.now();

  // Hook into response finish to log the outcome
  res.on('finish', () => {
    const duration = Date.now() - start;
    Logger.info(`Request Completed: ${req.method} ${req.url} ${res.statusCode} - ${duration}ms`, {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
    });
  });

  next();
};
