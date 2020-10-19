import React, { useState, ChangeEvent } from 'react';
import Spacer from '../spacer';
import Google from '../icons/google';
import Github from '../icons/github';
import styles from './login.module.scss';
import inputStyles from '../../styles/input.module.scss';
import buttonStyles from '../../styles/button.module.scss';
import linkStyles from '../../styles/link.module.scss';
import { isEmail, isMinNumber } from '../../utils';
import { Link } from 'react-router-dom';

interface IForm {
  email?: string;
  password?: string;
}

const Login = () => {
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [values, setValues] = useState<IForm>({});

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form className={styles.form}>
      <div className={styles.formContainer}>
        <h3 className={styles.formHeading}>Login</h3>
        <Spacer left="0" right="0" top="1.8em">
          <input
            className={inputStyles.formInput}
            name="email"
            type="email"
            placeholder="Email"
            value={values.email || ''}
            onChange={(ev) => {
              handleChange(ev);
              setIsValidEmail(isEmail(ev.target.value));
            }}
          />
        </Spacer>
        <Spacer left="0" right="0" top="0" bottom="1.8em">
          <input
            className={inputStyles.formInput}
            name="password"
            type="password"
            placeholder="Password"
            value={values.password || ''}
            onChange={(ev) => {
              handleChange(ev);
              setIsValidPassword(isMinNumber(ev.target.value, 6));
            }}
          />
        </Spacer>
        <button className={buttonStyles.formBtn} disabled={!isValidEmail || !isValidPassword}>
          Login
        </button>
        <Spacer left="0" right="0" top="1.8em" bottom="1.8em">
          <span className={styles.seperator}>or</span>
        </Spacer>

        <button className={buttonStyles.authOption}>
          <span style={{ height: 20 }}>
            <Google />
          </span>
          <span className={styles.authOptionText}>Login with Google</span>
        </button>
        <Spacer left="0" right="0" bottom="1.8em">
          <button className={buttonStyles.authOption}>
            <span style={{ height: 20 }}>
              <Github />
            </span>
            <span className={styles.authOptionText}>Login with Github</span>
          </button>
        </Spacer>
        <Link to="/signup" className={linkStyles.link}>
          Don't have an account?
        </Link>
      </div>
    </form>
  );
};

export default Login;
