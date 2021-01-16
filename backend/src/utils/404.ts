import { Request, Response, NextFunction } from 'express';
import { ResourceNotFoundError } from './errors';

export const not_found_handler = (req: Request, res: Response, next: NextFunction) => {
  const not_found = new ResourceNotFoundError('Requested resource not found or method not allowed');
  res.status(not_found.status_code).json({ ...not_found });
};
