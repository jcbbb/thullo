import { request } from '../utils';

export interface AuthEndpoints {
  checkEmail: (email: string) => Promise<Response | undefined>;
}

export const createAuthEndoints = (resourceUrl: string): AuthEndpoints => {
  const endpoints: AuthEndpoints = {
    checkEmail: async (email: string) =>
      await request(`${resourceUrl}/check-email`, {
        body: email,
      }),
  };

  return { ...endpoints };
};
