import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError, ZodIssue } from 'zod';
import { ApiError } from '../core/ApiError';

export const validate = (schema: ZodSchema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      const issues = (error as any).errors;
      const errorMessages = issues.map((issue: ZodIssue) => `${issue.path.join('.')}: ${issue.message}`);
      return next(new ApiError(400, 'Validation Error', errorMessages));
    }
    return next(error);
  }
};
