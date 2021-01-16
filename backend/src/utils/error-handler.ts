import { Response, Request, NextFunction } from 'express';
import { Error } from 'mongoose';
import { IError, ValidationError, DomainError, InternalError } from './errors';

export const error_handler = (err: IError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error.ValidationError) {
    const normalized_errors = {} as any;
    for (const error in err.errors) {
      normalized_errors[error] = err.errors[error].message;
    }
    const new_error = new ValidationError('Validation failed', 422, normalized_errors);
    return res.status(new_error.status_code).json({ ...new_error });
  }

  // Don't leak programmer errors to users.
  if (err instanceof DomainError) {
    return res.status(err.status_code).json({ ...err });
  }

  const internal_error = new InternalError();
  res.status(internal_error.status_code).json({ ...internal_error });
};
