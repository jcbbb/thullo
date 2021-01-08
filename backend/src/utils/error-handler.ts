import { Response, Request, NextFunction } from 'express';
import { Error } from 'mongoose';
import { IError, ValidationError } from './errors';

export const errorHandler = (err: IError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error.ValidationError) {
    const normalizedErrors = {} as any;
    for (const error in err.errors) {
      normalizedErrors[error] = err.errors[error].message;
    }
    const newError = new ValidationError('Validation failed', 422, normalizedErrors);
    return res.status(newError.statusCode).json({ ...newError });
  }
  res.status(err.statusCode || 500).json({ ...err });
};
