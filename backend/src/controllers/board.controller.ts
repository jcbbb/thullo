import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../utils/async-handler';
import * as BoardService from '../services/board.service';

export const create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { title, cover_photo_url, status } = req.body;
  const board = await BoardService.create({
    title,
    visibility: status,
    cover_photo_url,
    creator: _id,
  });
  res.status(201).json({ board });
});

export const getSingle = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { boardId } = req.params;
  const board = await BoardService.getSingle(boardId);
  res.status(200).json({ board });
});

export const getAllUserBoards = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.user;
    const boards = await BoardService.getAllUserBoards(_id);
    res.status(200).json(boards);
  }
);
