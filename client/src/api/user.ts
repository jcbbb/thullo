import { request } from '../utils';

export interface IUserEndpoints {
  getProfile: () => Promise<Response | undefined>;
}

export const createUserEndpoints = (resource_url: string): IUserEndpoints => {
  const endpoints: IUserEndpoints = {
    getProfile: async () => await request(`${resource_url}/profile`),
  };

  return { ...endpoints };
};
