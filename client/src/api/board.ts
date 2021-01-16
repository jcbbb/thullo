import { request } from '../utils';
import humps from 'humps';

type ICreate = {
  title: string;
  cover_photo_url: string;
  status: string;
};

export interface IBoardEndpoints {
  create: (values: ICreate) => Promise<Response | undefined>;
  getAllUserBoards: () => Promise<Response | undefined>;
}

export const createBoardEndpoints = (resourceUrl: string): IBoardEndpoints => {
  const endpoints: IBoardEndpoints = {
    create: async (values) =>
      await request(resourceUrl, {
        body: humps.decamelizeKeys(values),
      }),
    getAllUserBoards: async () => await request(resourceUrl),
  };

  return { ...endpoints };
};
