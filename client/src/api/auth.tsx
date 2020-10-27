import { request } from '../utils';

export interface IAuthEndpoints {
  checkEmail: (email: string) => Promise<Response | undefined>;
  createTempUser: (email: string) => Promise<Response | undefined>;
  verifyAuthCode: (email: string, authCode: string) => Promise<Response | undefined>;
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
  };

  return { ...endpoints };
};
