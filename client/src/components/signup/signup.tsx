import * as React from 'react';
import { useCallback, useState } from 'react';
import Spacer from '../spacer';
import Google from '../icons/google';
import Github from '../icons/github';
import styles from './signup.module.scss';
import buttonStyles from '../../styles/button.module.scss';
import linkStyles from '../../styles/link.module.scss';
import FormInput from '../formInput/formInput';
import ArrowLeft from '../icons/arrow-left';
import Indeterminate from '../indeterminate/indeterminate';
import api from '../../api';
import cn from 'classnames';
import { isEmail, isNumber, isMinLength, isMaxLength } from '@formiz/validations';
import { Link } from 'react-router-dom';
import { Formiz, useForm, FormizStep } from '@formiz/core';
import { useMutation } from 'react-query';

interface IState {
  emailTaken: boolean;
  tempUserCreated: boolean;
  authCodeVerified: boolean;
}

const Signup = () => {
  const myForm = useForm();

  const [state, setState] = useState<IState>({
    emailTaken: false,
    tempUserCreated: false,
    authCodeVerified: false,
  });

  const [checkExistingEmail, { isLoading: isEmailChecking }] = useMutation(
    (email: string) => api.auth.checkEmail(email),
    {
      onSuccess: () => setState((prevState) => ({ ...prevState, emailTaken: false })),
      onError: () => setState((prevState) => ({ ...prevState, emailTaken: true })),
    }
  );

  const [createTempUser, { isLoading: isTempUserCreating }] = useMutation(
    (email: string) => api.auth.createTempUser(email),
    {
      onSuccess: () => {
        setState((prevState) => ({
          ...prevState,
          tempUserCreated: true,
        }));
        if (myForm.nextStep) myForm.nextStep();
      },
      onError: () => {
        setState((prevState) => ({
          ...prevState,
          tempUserCreated: false,
        }));
      },
    }
  );

  const [verifyAuthCode, { isLoading: isVerifying }] = useMutation(
    ({ email, authCode }: { email: string; authCode: string }) =>
      api.auth.verifyAuthCode(email, authCode),
    {
      onSuccess: (data, vars) => {
        console.log('Data', data);
        setState((prevState) => ({
          ...prevState,
          authCodeVerified: true,
        }));
      },
      onError: (err, vars) => {
        console.log(err);
        setState((prevState) => ({
          ...prevState,
          authCodeVerified: false,
        }));
      },
    }
  );

  const shouldShowProgress = isTempUserCreating || isVerifying;

  const handleSubmit = useCallback(() => {
    console.log(myForm.values);
  }, [myForm.values]);

  const submitStep = async (event: React.FormEvent<HTMLFormElement>) => {
    event.persist();
    if (event) event.preventDefault();

    if (!myForm.currentStep || !(myForm.currentStep as any).isValid) {
      myForm.submitStep && myForm.submitStep(event);
      return;
    }

    const stepName = (myForm.currentStep as any).name;
    if (stepName === 'step_1') {
      await createTempUser(myForm.values?.email);
    }

    if (stepName === 'step_2') {
      const { email, authCode } = myForm.values;
      await verifyAuthCode({ email, authCode });
    }

    myForm.submitStep && myForm.submitStep(event);
  };

  return (
    <Formiz connect={myForm} onValidSubmit={handleSubmit}>
      <form
        noValidate
        className={cn(styles.form, { [styles.formDisabled]: shouldShowProgress })}
        onSubmit={submitStep}
      >
        <div className={styles.formContainer}>
          {shouldShowProgress && <Indeterminate />}
          <h3 className={styles.formHeading}>Signup</h3>
          {!myForm.isFirstStep && (
            <button className={styles.backBtn} onClick={myForm.prevStep} type="button">
              <ArrowLeft size={{ width: 20, height: 20 }} color="var(--primary)" />
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
                    rule: () => !state.emailTaken,
                    deps: [state.emailTaken],
                    message: 'Email is already taken',
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
            disabled={
              isTempUserCreating || isEmailChecking || state.emailTaken || !myForm.isStepValid
            }
            className={buttonStyles.formBtn}
          >
            {myForm.isLastStep ? 'Submit' : 'Next'}
          </button>
          <Spacer right="0" left="0" top="1.8em" bottom="1.8em">
            <span className={styles.seperator}>or</span>
          </Spacer>
          <button className={buttonStyles.authOption}>
            <span style={{ height: 20 }}>
              <Google />
            </span>
            <span className={styles.authOptionText}>Signup with Google</span>
          </button>
          <Spacer left="0" right="0" bottom="1.8em">
            <button className={buttonStyles.authOption}>
              <span style={{ height: 20 }}>
                <Github />
              </span>
              <span className={styles.authOptionText}>Signup with Github</span>
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
