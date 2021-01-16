import { Types } from 'mongoose';
import { BadRequestError, ResourceNotFoundError } from '../utils/errors';
import Board, { IBoard } from '../models/board.model';

type ICreate = {
  title: string;
  visibility: string;
  creator: Types.ObjectId;
  cover_photo_url: string;
};

export const create = async ({
  title,
  creator,
  visibility = 'Public',
  cover_photo_url,
}: ICreate) => {
  const is_public: boolean = visibility === 'Public';
  const is_private: boolean = !is_public;

  if (!title) {
    throw new BadRequestError('Title is required');
  }
  if (!creator) {
    throw new BadRequestError("Creator's id is required");
  }

  const new_board = new Board({ title, creator, private: is_private, cover_photo_url });

  return await new_board.save();
};

export const get_all_user_boards = async (creator_id: Types.ObjectId): Promise<IBoard[]> => {
  if (!creator_id) {
    throw new BadRequestError(`Creator id is required for getting boards for that user`);
  }
  return await Board.find({ creator: creator_id }).populate('creator');
};

export const get_single = async (board_id: string): Promise<IBoard> => {
  if (!board_id) {
    throw new BadRequestError('Board id is required');
  }
  const board = await Board.findById(board_id).populate('creator');

  if (!board) {
    throw new ResourceNotFoundError(`Board with id of ${board_id} is not found`);
  }
  return board;
};
