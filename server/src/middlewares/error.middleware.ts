import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../core/ApiError';
import { config } from '../config';
import { Logger } from '../core/Logger';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = err;

  // Check if error is an instance of ApiError, if not, convert it
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || error instanceof Error ? 500 : 400;
    const message = error.message || 'Something went wrong';
    error = new ApiError(statusCode, message, [], error.stack);
  }

  const response = {
    ...error,
    message: error.message,
    ...(config.env === 'development' ? { stack: error.stack } : {}),
  };

  Logger.error(`${error.message}`, {
    statusCode: error.statusCode,
    url: req.originalUrl,
    method: req.method,
    stack: error.stack,
  });

  res.status(error.statusCode).json(response);
};
