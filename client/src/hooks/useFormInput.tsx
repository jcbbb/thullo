import { useState, useEffect, useCallback } from 'react';
import { IFormInput } from '../components/formInput/formInput';

interface InputState {
  value: null | string;
  isValid: boolean;
  isPristine: boolean;
  errorMessage: null | string;
}

const useFormInput = (props: IFormInput) => {
  const { validations } = props;
  const [{ isValid, value, isPristine, errorMessage }, setState] = useState<InputState>({
    value: null,
    isValid: false,
    isPristine: true,
    errorMessage: null,
  });

  const setValue = useCallback((value: string) => {
    setState((prevState: InputState) => ({
      ...prevState,
      value,
      isPristine: false,
    }));
  }, []);

  useEffect(() => {
    const validateInput = () => {
      validations?.forEach((validation) => {
        if (validation.rule(value)) {
          setState((prevState: InputState) => ({
            ...prevState,
            isValid: true,
            isPristine: false,
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            isValid: false,
            errorMessage: validation.message,
          }));
        }
      });
    };

    const timer = setTimeout(() => {
      validateInput();
    }, 200);

    return () => clearTimeout(timer);
  }, [validations, value]);

  return { value, setValue, isValid, errorMessage, isPristine };
};

export default useFormInput;
