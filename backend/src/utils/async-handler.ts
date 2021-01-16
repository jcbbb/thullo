import { Request, Response, NextFunction } from 'express';

export const async_handler = (cbFn: Function) => (
  req: Request,
  res: Response,
  next: NextFunction
) => cbFn(req, res, next).catch(next);
