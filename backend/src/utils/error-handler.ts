import { Response, Request, NextFunction } from 'express'
import { IError } from './errors'

export const errorHandler = (err: IError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode!).json({ ...err })
}
