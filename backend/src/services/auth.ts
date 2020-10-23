import User from '../models/user';
import TempUser from '../models/tempUser';

interface ISignup {
  email: string;
  password: string;
  name: string;
  authCode: number;
}

const Auth = (() => {
  const login = async () => {};
  const signup = async (email, password, name, authCode) => {
    try {
      const candidate = await User.findOne({ email });
      const tempUserCandidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: 'User already exists' });
      }
      if (!tempUserCandidate) {
        return res.status(400).json({
          message:
            "User with given email was not granted an auth code. Please, don't mess with me!",
        });
      }
      const isValidAuthCode = tempUserCandidate.compareAuthCode(authCode);
      if (!isValidAuthCode) {
        return res.status(400).json({
          message: "Auth code provided didn't match our records. Don't mess with me!",
        });
      }

      const user = new User({ email, password, name });
      await user.save();
      await generateToken(user);
      res.status(201).json({ message: 'User created' });
    } catch (err) {
      res.status(500).json({ message: 'Something went wrong. Please, try again' });
    }
  };
})();

export default Auth;
