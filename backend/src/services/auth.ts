import User from '../models/user';
import TempUser from '../models/tempUser';
import { BadRequestError } from '../utils/errors';

const Auth = (() => {
  const login = async (email: string, password: string) => {
    const user = await User.findOne({ email }, { password: 0 });

    if (!user) {
      throw new BadRequestError('User not found');
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw new BadRequestError('Incorrect password or email');
    }

    await generateToken(user);

    return { user };
  };

  const signup = async (email: string, password: string, name: string, authCode: string) => {
    const candidate = await User.findOne({ email });
    const tempUserCandidate = await User.findOne({ email });

    if (candidate) {
      throw new BadRequestError('User already  exists');
    }

    if (!tempUserCandidate) {
      throw new BadRequestError(
        "User with given email was not granted an auth code. Please, don't mess with me!",
      );
    }
    const isValidAuthCode = tempUserCandidate.compareAuthCode(authCode);
    if (!isValidAuthCode) {
      throw new BadRequestError("Auth code provided didn't match our records. Don't mess with me!");
    }

    const user = new User({ email, password, name });
    await user.save();
    await generateToken(user);
    return { user };
  };

  const verify = async (email: string, authCode) => {
    const candidate = await TempUser.findOne({ email });

    if (!candidate) {
      throw new BadRequestError('User does not exist');
    }

    const isMatch = await candidate.compareAuthCode(authCode);

    if (!isMatch) {
      throw new BadRequestError('Auth code does not match');
    }

    return isMatch;
  };

  const check = async (email: string) => {
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      throw new BadRequestError('Email is already taken');
    }

    return !!existingEmail;
  };

  const createTempUser = async (email: string) => {
    const candidate = await TempUser.findOne({ email });
    const authCode = randomNumber();

    if (candidate) {
      await TempUser.deleteOne({ email });
    }

    const tempUser = new TempUser({ email, authCode });

    await tempUser.save();
    await Mail.send(authCode);
  };
  return { login, signup, verify, check, createTempUser };
})();

export default Auth;
