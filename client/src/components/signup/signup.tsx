import * as React from 'react';
import { useCallback } from 'react';
import Spacer from '../spacer';
import Google from '../icons/google';
import Github from '../icons/github';
import styles from './signup.module.scss';
import buttonStyles from '../../styles/button.module.scss';
import linkStyles from '../../styles/link.module.scss';
import FormInput from '../formInput/formInput';
import ArrowLeft from '../icons/arrow-left';
import { isEmail, isNumber, isMinLength, isMaxLength } from '@formiz/validations';
import { Link } from 'react-router-dom';
import { Formiz, useForm, FormizStep } from '@formiz/core';

const Signup = () => {
  const myForm = useForm();

  const handleSubmit = useCallback(() => {
    console.log(myForm.values);
  }, [myForm.values]);

  return (
    <Formiz connect={myForm} onValidSubmit={handleSubmit}>
      <form noValidate className={styles.form} onSubmit={myForm.submit}>
        <div className={styles.formContainer}>
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
                  if (isEmail()(value)) {
                    console.log('Make request here to check existing email');
                  }
                }}
                validations={[
                  {
                    rule: isEmail(),
                    message: 'Provide a valid email',
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
            disabled={!myForm.isStepValid}
            className={buttonStyles.formBtn}
            onClick={myForm.nextStep}
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
