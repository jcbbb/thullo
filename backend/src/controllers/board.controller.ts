import { Request, Response } from 'express';
import { async_handler } from '../utils/async-handler';
import * as BoardService from '../services/board.service';

export const create = async_handler(async (req: Request, res: Response) => {
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

export const get_single = async_handler(async (req: Request, res: Response) => {
  const { board_id } = req.params;
  const board = await BoardService.get_single(board_id);
  res.status(200).json({ board });
});

export const get_all_user_boards = async_handler(async (req: Request, res: Response) => {
  const { _id } = req.user;
  const boards = await BoardService.get_all_user_boards(_id);
  res.status(200).json(boards);
});
