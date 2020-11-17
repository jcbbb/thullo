import { request } from '../utils';

type ISignup = {
    email: string;
    password: string;
    name: string;
    authCode: string;
}

type ILogin = {
    email: string;
    password: string;
}

export interface IAuthEndpoints {
    checkEmail: (email: string) => Promise<Response | undefined>;
    createTempUser: (email: string) => Promise<Response | undefined>;
    verifyAuthCode: (email: string, authCode: string) => Promise<Response | undefined>;
    signup: (sigupCreds: ISignup) => Promise<Response | undefined>
    login: (loginCreds: ILogin) => Promise<Response | undefined>
    checkAuth: () => Promise<Response | undefined>
}

export const createAuthEndoints = (resourceUrl: string): IAuthEndpoints => {
    const endpoints: IAuthEndpoints = {
        createTempUser: async (email: string) =>
            await request(`${resourceUrl}/temp-user`, {
                body: {
                    email,
                },
            }),
        checkEmail: async (email: string) =>
            await request(`${resourceUrl}/check-email`, {
                body: {
                    email,
                },
            }),
        verifyAuthCode: async (email: string, authCode: string) =>
            await request(`${resourceUrl}/verify`, {
                body: {
                    email,
                    authCode,
                },
            }),
        signup: async (signupCreds) =>
            await request(`${resourceUrl}/signup`, {
                body: signupCreds
            }),
        login: async (loginCreds) => await request(`${resourceUrl}/login`, {
            body: loginCreds
        }),
        checkAuth: async () => await request(`${resourceUrl}/me`)
    };

    return { ...endpoints };
};
