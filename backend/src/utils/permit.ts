import { Response, Request, NextFunction } from 'express';
import { AuthorizationError } from './errors';

type roles = 'user' | 'admin';

export const permit = (...permitted_roles: roles[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user && permitted_roles.includes(user.role as roles)) {
      return next();
    } else {
      throw new AuthorizationError('Forbidden');
    }
  };
};
