import { request } from '../utils';

export interface IAuthEndpoints {
  checkEmail: (email: string) => Promise<Response | undefined>;
}

export const createAuthEndoints = (resourceUrl: string): IAuthEndpoints => {
  const endpoints: IAuthEndpoints = {
    checkEmail: async (email: string) =>
      await request(`${resourceUrl}/check-email`, {
        body: email,
      }),
  };

  return { ...endpoints };
};
