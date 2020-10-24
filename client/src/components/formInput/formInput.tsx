import * as React from 'react';
import inputStyles from '../../styles/input.module.scss';
import useFormInput from '../../hooks/useFormInput';
import { IValidation } from '../../hooks/useForm';

export interface IFormInput {
  type?: string;
  name: string;
  validations?: IValidation[];
  placeholder?: string;
}
const FormInput = (props: IFormInput) => {
  const { value, setValue, isValid, isPristine, errorMessage } = useFormInput(props);
  const { type, placeholder, name } = props;

  return (
    <>
      <input
        className={inputStyles.formInput}
        name={name}
        value={value ?? ''}
        type={type || 'text'}
        placeholder={placeholder || ''}
        onChange={({ target }) => setValue(target.value)}
      />
      {!isValid && !isPristine && <span className={inputStyles.errorText}>{errorMessage}</span>}
    </>
  );
};

export default FormInput;
