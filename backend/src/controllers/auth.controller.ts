import { Response, Request } from 'express';
import { async_handler } from '../utils/async-handler';
import * as AuthService from '../services/auth.service';
import * as CookieService from '../services/cookie.service';

export const check_email = async_handler(async (req: Request, res: Response) => {
  const { email } = req.body;
  await AuthService.check(email);
  res.status(200).json({ message: 'Email is not taken', status_code: 200 });
});

export const temp_user = async_handler(async (req: Request, res: Response) => {
  const { email } = req.body;
  await AuthService.create_temp_user(email);
  res.status(201).json({ message: 'Temporary user created for an hour.', status_code: 201 });
});

export const verify = async_handler(async (req: Request, res: Response) => {
  const { email, auth_code } = req.body;
  await AuthService.verify(email, auth_code);
  res.status(200).json({ message: 'Auth code verified', status_code: 200 });
});

export const signup = async_handler(async (req: Request, res: Response) => {
  const { email, password, name, auth_code } = req.body;
  const { access_token } = await AuthService.signup(email, password, name, auth_code);
  const { cookie_name, token, opts } = CookieService.get_access_token_cookie(access_token);
  res
    .cookie(cookie_name, token, opts)
    .status(201)
    .json({ message: 'User created', status_code: 201, access_token });
});

export const login = async_handler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { access_token } = await AuthService.login(email, password);
  const { cookie_name, token, opts } = CookieService.get_access_token_cookie(access_token);
  res
    .cookie(cookie_name, token, opts)
    .status(200)
    .json({ message: 'Logged in', status_code: 200, access_token });
});

export const me = (req: Request, res: Response) => {
  res.json({ message: 'Access token verified', status_code: 200 });
};
