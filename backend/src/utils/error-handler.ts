import { Response } from 'express'
import { IError } from './errors'

export const errorHandler = (err: IError, res: Response) => {
    return res.status(err.statusCode!).json({ ...err })
}
