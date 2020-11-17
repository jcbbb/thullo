import React, { useCallback, useEffect } from 'react';
import Spacer from '../spacer';
import FormInput from '../formInput/formInput';
import Indeterminate from '../indeterminate/indeterminate';
import GoogleIcon from '../icons/google';
import GithubIcon from '../icons/github';
import useAsync from '../../hooks/useAsync'
import styles from './login.module.scss';
import buttonStyles from '../../styles/button.module.scss';
import linkStyles from '../../styles/link.module.scss';
import inputStyles from '../../styles/input.module.scss';
import { Link } from 'react-router-dom';
import { Formiz, useForm } from '@formiz/core';
import { isEmail, isMinLength } from '@formiz/validations';
import { useAuthDispatch } from '../../context/authContext'
import api from '../../api'

const Login = () => {
    const form = useForm({ subscribe: true });
    const authDispatch = useAuthDispatch()
    const [login, loginState] = useAsync(api.auth.login)

    const handleSubmit = useCallback((ev) => {
        ev.preventDefault()
        login(form.values)
    }, [form.values, login])

    useEffect(() => {
        if (loginState.isSuccess) {
            authDispatch({ type: 'LOGIN' })
        }
    }, [loginState.isSuccess, authDispatch])

    return (
        <Formiz connect={form} onValidSubmit={handleSubmit}>
            <form className={styles.form} noValidate onSubmit={handleSubmit}>
                {loginState.isLoading && <Indeterminate />}
                <div className={styles.formContainer}>
                    <h3 className={styles.formHeading}>Login</h3>
                    <Spacer left="0" right="0" top="1.8em">
                        <FormInput
                            name="email"
                            type="email"
                            placeholder="Email"
                            required="Email is required"
                            autoComplete="current-email"
                            validations={[{
                                rule: isEmail(),
                                message: 'Provide a valid email'
                            }]}
                        />
                    </Spacer>
                    <Spacer left="0" right="0" top="0" bottom="0.8em">
                        <FormInput
                            name="password"
                            type="password"
                            placeholder="Password"
                            required="Password is required"
                            autoComplete="current-password"
                            validations={[
                                {
                                    rule: isMinLength(6),
                                    message: 'Password should be at least 6 characters',
                                },
                            ]}
                        />
                    </Spacer>
                    {loginState.isError && (
                        <Spacer top="0" bottom="1.8em" left="0" right="0">
                            <span className={inputStyles.errorText}>{loginState.error?.message}</span>
                        </Spacer>
                    )}
                    <button className={buttonStyles.primary} disabled={!form.isStepValid || loginState.isLoading}>Login</button>
                    <Spacer left="0" right="0" top="1.8em" bottom="1.8em">
                        <span className={styles.seperator}>or</span>
                    </Spacer>
                    <button className={buttonStyles.authOption}>
                        <span style={{ height: 20 }}>
                            <GoogleIcon />
                        </span>
                        <span className={styles.authOptionText}>Continue with Google</span>
                    </button>
                    <Spacer left="0" right="0" bottom="1.8em">
                        <button className={buttonStyles.authOption}>
                            <span style={{ height: 20 }}>
                                <GithubIcon />
                            </span>
                            <span className={styles.authOptionText}>Continue with Github</span>
                        </button>
                    </Spacer>
                    <Link to="/" className={linkStyles.link}>
                        Don't have an account?
        </Link>
                </div>
            </form>
        </Formiz>
    );
};

export default Login;
