import config from '../config';

type AccessToken = string;

export const getAccessTokenCookie = (accessToken: AccessToken) => {
  const accessTokenExpiration = parseInt(config.access_token_expiration, 10);
  return {
    cookieName: 'accessToken',
    token: accessToken,
    opts: {
      expires: new Date(Date.now() + accessTokenExpiration),
      secure: true,
      sameSite: true,
      httpOnly: true,
    },
  };
};
