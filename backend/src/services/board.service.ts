import { Types } from 'mongoose'
import { BadRequestError, ResourceNotFoundError } from "../utils/errors"
import Board, { IBoard } from '../models/board.model';

type ICreate = {
    title: string;
    visibility: string;
    creator: Types.ObjectId;
    cover_photo_url: string;
}

export const create = async ({ title, creator, visibility = 'Public', cover_photo_url }: ICreate) => {
    const isPublic: boolean = visibility === 'Public';
    const isPrivate: boolean = !isPublic;
    if (!title) {
        throw new BadRequestError('Title is required')
    }
    if (!creator) {
        throw new BadRequestError("Creator's id is required")
    }

    const newBoard = new Board({ title, creator, private: isPrivate, cover_photo_url })
    return await newBoard.save();
}

export const getAllUserBoards = async (creatorId: Types.ObjectId): Promise<IBoard[]> => {
    if (!creatorId) {
        throw new BadRequestError(`Creator id is required for getting boards for that user`)
    }
    return await Board.find({ creator: creatorId }).populate('creator');
}

export const getSingle = async (boardId: string): Promise<IBoard> => {
    if (!boardId) {
        throw new BadRequestError('Board id is required');
    }
    const board = await Board.findById(boardId).populate('creator');

    if (!board) {
        throw new ResourceNotFoundError(`Board with id of ${boardId} is not found`);
    }
    return board;
}