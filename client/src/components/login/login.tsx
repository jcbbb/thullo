import React from 'react';
import Spacer from '../spacer';
import Google from '../icons/google';
import Github from '../icons/github';
import styles from './login.module.css';
import inputStyles from '../../styles/input.module.css';
import buttonStyles from '../../styles/button.module.css';

const Login = () => {
    return (
        <form className={styles.form}>
            <div className={styles.formContainer}>
                <h3 className={styles.formHeading}>Login</h3>
                <Spacer left="0" right="0" top="1.8em">
                    <input className={inputStyles.formInput} name="email" type="email" placeholder="Email" />
                </Spacer>
                <Spacer left="0" right="0" top="0" bottom="1.8em">
                    <input className={inputStyles.formInput} name="password" type="password" placeholder="Password" />
                </Spacer>
                <button className={buttonStyles.formBtn}>Login</button>
                <Spacer left="0" right="0" top="1.8em" bottom="1.8em">
                    <span className={styles.seperator}>or</span>
                </Spacer>

                <button className={buttonStyles.authOption}>
                    <span style={{ height: 20 }}>
                        <Google />
                    </span>
                    <span className={styles.authOptionText}>Login with Google</span>
                </button>
                <Spacer left="0" right="0" top="0" />
                <button className={buttonStyles.authOption}>
                    <span style={{ height: 20 }}>
                        <Github />
                    </span>
                    <span className={styles.authOptionText}>Login with Github</span>
                </button>
            </div>
        </form>
    );
};

export default Login;
