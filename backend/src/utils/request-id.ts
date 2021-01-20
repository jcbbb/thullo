import { v4 } from 'uuid';
import { Request, Response, NextFunction } from 'express';

type Opts = {
  setHeader: boolean;
  headerName: string;
};

export const request_id = (
  opts: Opts = {
    headerName: 'X-Request-Id',
    setHeader: true,
  }
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.request_id = req.headers[opts.headerName.toLowerCase()] || v4();
    if (opts.setHeader) {
      res.setHeader(opts.headerName, req.request_id);
    }
    next();
  };
};
