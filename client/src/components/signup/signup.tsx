import * as React from 'react';
import {useCallback, useMemo} from 'react';
import Spacer from '../spacer';
import GoogleIcon from '../icons/google';
import GithubIcon from '../icons/github';
import styles from './signup.module.scss';
import buttonStyles from '../../styles/button.module.scss';
import linkStyles from '../../styles/link.module.scss';
import FormInput from '../formInput/formInput';
import ArrowLeft from '../icons/arrow-left';
import Indeterminate from '../indeterminate/indeterminate';
import api from '../../api';
import cn from 'classnames';
import useAsync from '../../hooks/useAsync';
import {isEmail, isNumber, isMinLength, isMaxLength} from '@formiz/validations';
import {Link} from 'react-router-dom';
import {Formiz, useForm, FormizStep} from '@formiz/core';

const Signup = () => {
    const myForm = useForm({subscribe: true});

    const [checkExistingEmail, emailState] = useAsync(api.auth.checkEmail);
    const [createTempUser, tempUserState] = useAsync(api.auth.createTempUser);
    const [verifyAuthCode, authCodeState] = useAsync(api.auth.verifyAuthCode);
    const [signup, signupState] = useAsync(api.auth.signup);

    const shouldShowProgress = useMemo(
        () => tempUserState.isLoading || authCodeState.isLoading || signupState.isLoading,
        [tempUserState.isLoading, authCodeState.isLoading, signupState.isLoading]
    );

    const handleSubmit = useCallback(async () => {
        const {email, password, name, authCode} = myForm.values;
        await signup(email, password, name, authCode);
    }, [myForm.values, signup]);

    const handleSubmitStep = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = myForm as any;
        if (!form.currentStep || !form.currentStep.isValid || !form.currentStep.name) {
            form.submitStep();
            return;
        }

        const stepName = form.currentStep.name;
        if (stepName === 'step_1') {
            const {email} = form.values;
            await createTempUser(email);
        }

        if (stepName === 'step_2') {
            const {email, authCode} = form.values;
            await verifyAuthCode(email, authCode);
        }

        form.submitStep();
    };

    return (
        <Formiz connect={myForm} onValidSubmit={handleSubmit}>
            <form
                noValidate
                className={cn(styles.form, {[styles.formDisabled]: shouldShowProgress})}
                onSubmit={handleSubmitStep}
            >
                <div className={styles.formContainer}>
                    {shouldShowProgress && <Indeterminate />}
                    <h3 className={styles.formHeading}>Signup</h3>
                    {!myForm.isFirstStep && (
                        <button className={styles.backBtn} onClick={myForm.prevStep} type="button">
                            <ArrowLeft size={{width: 20, height: 20}} color="var(--primary)" />
                        </button>
                    )}
                    <FormizStep name="step_1">
                        <Spacer left="0" right="0" top="1.8em">
                            <FormInput
                                type="email"
                                name="email"
                                placeholder="Email"
                                required="Email is required"
                                autoComplete="current-email"
                                onChange={(value: string) => {
                                    if (value && isEmail()(value)) {
                                        checkExistingEmail(value);
                                    }
                                }}
                                validations={[
                                    {
                                        rule: isEmail(),
                                        message: 'Provide a valid email',
                                    },
                                    {
                                        rule: () => !emailState.isError,
                                        message: emailState.error?.message,
                                        deps: [emailState.isError, emailState.error],
                                    },
                                ]}
                            />
                        </Spacer>
                    </FormizStep>
                    <FormizStep name="step_2">
                        <Spacer left="0" right="0" top="1.8em">
                            <FormInput
                                type="text"
                                name="authCode"
                                placeholder="Auth code"
                                required="Auth code is required"
                                autoComplete="current-authcode"
                                validations={[
                                    {
                                        rule: isNumber(),
                                        message: 'Only numeric values are allowed',
                                    },
                                    {
                                        rule: isMinLength(6),
                                        message: 'Auth code should be 6 digits',
                                    },
                                    {
                                        rule: isMaxLength(6),
                                        message: 'Auth code should be 6 digits',
                                    },
                                ]}
                            />
                        </Spacer>
                    </FormizStep>
                    <FormizStep name="step_3">
                        <Spacer left="0" right="0" top="1.8em">
                            <FormInput
                                type="text"
                                name="name"
                                placeholder="Your name"
                                required="This field is required"
                                autoComplete="current-name"
                                validations={[
                                    {
                                        rule: isMaxLength(50),
                                        message: 'Your name is ridiculous',
                                    },
                                ]}
                            />
                        </Spacer>
                        <Spacer left="0" right="0" top="0" bottom="1.8em">
                            <FormInput
                                type="password"
                                name="password"
                                placeholder="Password"
                                required="Password should be at least 6 characters"
                                autoComplete="current-password"
                                validations={[
                                    {
                                        rule: isMinLength(6),
                                        message: 'Password should be at least 6 characters',
                                    },
                                ]}
                            />
                        </Spacer>
                    </FormizStep>
                    <button
                        type="submit"
                        disabled={emailState.isError || !myForm.isStepValid}
                        className={buttonStyles.primary}
                    >
                        {myForm.isLastStep ? 'Submit' : 'Next'}
                    </button>
                    <Spacer right="0" left="0" top="1.8em" bottom="1.8em">
                        <span className={styles.seperator}>or</span>
                    </Spacer>
                    <button className={buttonStyles.authOption}>
                        <span style={{height: 20}}>
                            <GoogleIcon />
                        </span>
                        <span className={styles.authOptionText}>Continue with Google</span>
                    </button>
                    <Spacer left="0" right="0" bottom="1.8em">
                        <button className={buttonStyles.authOption}>
                            <span style={{height: 20}}>
                                <GithubIcon />
                            </span>
                            <span className={styles.authOptionText}>Continue with Github</span>
                        </button>
                    </Spacer>
                    <Link to="/login" className={linkStyles.link}>
                        Already have an account?
          </Link>
                </div>
            </form>
        </Formiz>
    );
};

export default Signup;
