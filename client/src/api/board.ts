import { request } from '../utils';

type ICreate = {
    title: string;
    cover_photo_url: string;
    status: string;
}

export interface IBoardEndpoints {
    create: (values: ICreate) => Promise<Response | undefined>
}

export const createBoardEndoints = (resourceUrl: string): IBoardEndpoints => {
    const endpoints: IBoardEndpoints = {
        create: async (values) =>
            await request(resourceUrl, {
                body: values
            })
    };

    return { ...endpoints };
};