import config from '../config';

type AccessToken = string;

export const get_access_token_cookie = (access_token: AccessToken) => {
  const accessTokenExpiration = parseInt(config.access_token_expiration, 10);
  return {
    cookie_name: 'access_token',
    token: access_token,
    opts: {
      expires: new Date(Date.now() + accessTokenExpiration),
      secure: true,
      sameSite: true,
      httpOnly: true,
    },
  };
};
