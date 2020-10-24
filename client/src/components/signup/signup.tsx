import * as React from 'react';
import Spacer from '../spacer';
import Google from '../icons/google';
import Github from '../icons/github';
import styles from './signup.module.scss';
import buttonStyles from '../../styles/button.module.scss';
import linkStyles from '../../styles/link.module.scss';
import FormContextProvider from '../../context/FormContext';
import { isEmail } from '../../utils';
import { Link } from 'react-router-dom';
import FormInput from '../formInput/formInput';
import Step from '../step/step';

const Signup = () => {
  return (
    <FormContextProvider>
      <form noValidate className={styles.form}>
        <div className={styles.formContainer}>
          <h3 className={styles.formHeading}>Signup</h3>
          <Spacer left="0" right="0" top="1.8em">
            <Step name="step_1">
              <FormInput
                type="email"
                name="email"
                placeholder="Email"
                validations={[
                  {
                    rule: isEmail(),
                    message: 'Provide a valid email',
                  },
                ]}
              />
            </Step>
          </Spacer>
          <button className={buttonStyles.formBtn}>Signup</button>
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
    </FormContextProvider>
  );
};

export default Signup;
