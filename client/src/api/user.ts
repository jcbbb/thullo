import { request } from '../utils';

export interface IUserEndpoints {
    getProfile: () => Promise<Response | undefined>
}

export const createUserEndpoints = (resourceUrl: string): IUserEndpoints => {
    const endpoints: IUserEndpoints = {
        getProfile: async () => await request(`${resourceUrl}/profile`)
    };

    return { ...endpoints };
};
