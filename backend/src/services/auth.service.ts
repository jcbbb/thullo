import User from '../models/user.model';
import TempUser from '../models/temp-user.model';
import { BadRequestError, ResourceNotFoundError } from '../utils/errors';
import { generate_token, random_number } from '../utils';
import * as Mail from './mail.service';

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequestError('User not found');
  }

  const is_match = await user.compare_password(password);

  if (!is_match) {
    throw new BadRequestError('Incorrect password or email');
  }

  const access_token = generate_token(user);

  return { user, access_token };
};

export const signup = async (email: string, password: string, name: string, auth_code: string) => {
  const candidate = await User.findOne({ email });
  const temp_user_candidate = await TempUser.findOne({ email });

  if (candidate) {
    throw new BadRequestError('User already  exists');
  }

  if (!temp_user_candidate) {
    throw new BadRequestError(
      "User with given email was not granted an auth code. Please, don't mess with me!"
    );
  }

  const is_valid_auth_code = await temp_user_candidate.compare_auth_code(auth_code);

  if (!is_valid_auth_code) {
    throw new BadRequestError("Auth code provided didn't match our records. Don't mess with me!");
  }

  const user = new User({ email, password, name });
  await user.save();

  const access_token = generate_token(user);

  return { user, access_token };
};

export const verify = async (email: string, auth_code: string) => {
  const candidate = await TempUser.findOne({ email });

  if (!candidate) {
    throw new ResourceNotFoundError('User does not exist');
  }

  const is_match = await candidate.compare_auth_code(auth_code);

  if (!is_match) {
    throw new BadRequestError('Auth code does not match');
  }

  return is_match;
};

export const check = async (email: string): Promise<void | BadRequestError> => {
  const existing_email = await User.findOne({ email });

  if (existing_email) {
    throw new BadRequestError('Email is already taken');
  }
};

export const create_temp_user = async (email: string) => {
  const candidate = await TempUser.findOne({ email });
  const existing_user = await User.findOne({ email });

  if (existing_user) {
    throw new BadRequestError('Email is already taken');
  }

  if (candidate) {
    await TempUser.deleteOne({ email });
  }

  const auth_code = random_number();

  const temp_user = new TempUser({ email, auth_code });

  await temp_user.save();

  await Mail.send({
    to: temp_user.email,
    template: 'auth-code',
    subject: `Your auth code is ${auth_code}`,
    vars: {
      auth_code,
    },
  } as Mail.IMailOptions);
};
