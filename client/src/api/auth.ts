import { request } from '../utils';
import humps from 'humps';

type ISignup = {
  email: string;
  password: string;
  name: string;
  auth_code: string;
};

type ILogin = {
  email: string;
  password: string;
};

export interface IAuthEndpoints {
  checkEmail: (email: string) => Promise<Response | undefined>;
  createTempUser: (email: string) => Promise<Response | undefined>;
  verifyAuthCode: (email: string, auth_code: string) => Promise<Response | undefined>;
  signup: (sigupCreds: ISignup) => Promise<Response | undefined>;
  login: (loginCreds: ILogin) => Promise<Response | undefined>;
  checkAuth: () => Promise<Response | undefined>;
}

export const createAuthEndpoints = (resourceUrl: string): IAuthEndpoints => {
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
    verifyAuthCode: async (email: string, auth_code: string) =>
      await request(`${resourceUrl}/verify`, {
        body: {
          email,
          auth_code,
        },
      }),
    signup: async (signupCreds) =>
      await request(`${resourceUrl}/signup`, {
        body: humps.decamelizeKeys(signupCreds),
      }),
    login: async (loginCreds) =>
      await request(`${resourceUrl}/login`, {
        body: humps.decamelizeKeys(loginCreds),
      }),
    checkAuth: async () => await request(`${resourceUrl}/me`),
  };

  return { ...endpoints };
};
