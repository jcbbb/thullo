import React, {useState, ChangeEvent} from 'react';
import Spacer from '../spacer';
import Google from '../icons/google';
import Github from '../icons/github';
import styles from './login.module.scss';
import inputStyles from '../../styles/input.module.scss';
import buttonStyles from '../../styles/button.module.scss';
import linkStyles from '../../styles/link.module.scss';
import {Link} from 'react-router-dom';

interface IForm {
    email?: string;
    password?: string;
}

const Login = () => {
    const [values, setValues] = useState<IForm>({});

    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = ev.target;
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
                        }}
                    />
                </Spacer>
                <button className={buttonStyles.primary}>Login</button>
                <Spacer left="0" right="0" top="1.8em" bottom="1.8em">
                    <span className={styles.seperator}>or</span>
                </Spacer>

                <button className={buttonStyles.authOption}>
                    <span style={{height: 20}}>
                        <Google />
                    </span>
                    <span className={styles.authOptionText}>Continue with Google</span>
                </button>
                <Spacer left="0" right="0" bottom="1.8em">
                    <button className={buttonStyles.authOption}>
                        <span style={{height: 20}}>
                            <Github />
                        </span>
                        <span className={styles.authOptionText}>Continue with Github</span>
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
