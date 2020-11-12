import { request } from '../utils';

export interface IUnsplashEnpoints {
    search: (query: string, limit: number) => Promise<Response | undefined>;
    getRandom: () => Promise<Response | undefined>;
}

const unsplashSecret = process.env.REACT_APP_UNSPLASH_ACCESS_KEY as string;

export const createUnsplashEndpoints = (resourceUrl: string): IUnsplashEnpoints => {
    const endpoints: IUnsplashEnpoints = {
        search: async (query: string, limit: number = 12) =>
            await request(`${resourceUrl}/search/photos?query=${query}&per_page=${limit}`, {
                headers: {
                    Authorization: `Client-ID ${unsplashSecret}`,
                },
            }),
        getRandom: async () => await request(`${resourceUrl}/photos/random?featured`, {
            headers: {
                Authorization: `Client-ID ${unsplashSecret}`,
            },
        }),
    };

    return { ...endpoints };
};
