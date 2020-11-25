import { Request, Response, NextFunction } from 'express';
import * as BoardService from '../services/board.service';

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id } = req.user;
        const { title, cover_photo_url, status } = req.body;
        const board = await BoardService.create({ title, visibility: status, cover_photo_url, creator: _id })
        res.status(201).json({ board })
    } catch (err) {
        return next(err);
    }
}

export const getSingle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { boardId } = req.params;
        const board = await BoardService.getSingle(boardId)
        res.status(200).json({ board })
    } catch (err) {
        return next(err)
    }
}

export const getAllUserBoards = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id } = req.user;
        const boards = await BoardService.getAllUserBoards(_id);
        res.status(200).json({ boards })
    } catch (err) {
        return next(err)
    }
}