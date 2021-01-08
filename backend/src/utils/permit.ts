import { Response, Request, NextFunction } from 'express';
import { AuthorizationError } from './errors';

type roles = 'user' | 'admin';

export const permit = (...permittedRoles: roles[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user && permittedRoles.includes(user.role as roles)) {
      return next();
    } else {
      throw new AuthorizationError('Forbidden');
    }
  };
};
