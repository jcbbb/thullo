import {Types} from 'mongoose'
import {BadRequestError} from "../utils/errors"
import Board from '../models/board';

type ICreate = {
    title: string;
    visibility: string;
    creator: Types.ObjectId
}

export const create = async ({title, creator, visibility = 'public'}: ICreate) => {
    const isPublic: boolean = visibility === 'public';
    const isPrivate: boolean = !isPublic;

    if (!title) {
        throw new BadRequestError('Title is required')
    }
    if (!creator) {
        throw new BadRequestError("Creator's id is required")
    }

    const board = new Board({title, creator, private: isPrivate, })
    await board.save();
}


