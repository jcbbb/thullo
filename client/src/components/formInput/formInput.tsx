import * as React from 'react';
import inputStyles from '../../styles/input.module.scss';
import cn from 'classnames';
import { useField } from '@formiz/core';

const FormInput = React.forwardRef((props: any, ref: any) => {
  const { setValue, value, isValid, isPristine, errorMessage, isSubmitted } = useField(props);
  const { name, placeholder, type, maxLength, autoComplete } = props;

  const showError = !isValid && (!isPristine || isSubmitted);
  return (
    <>
      <input
        className={cn(inputStyles.formInput, { [inputStyles.errorInput]: showError })}
        name={name}
        value={value ?? ''}
        type={type || 'text'}
        placeholder={placeholder || ''}
        onChange={({ target }) => setValue(target.value)}
        maxLength={maxLength}
        autoComplete={autoComplete}
        ref={ref}
      />
      {showError && <span className={inputStyles.errorText}>{errorMessage}</span>}
    </>
  );
});

export default FormInput;
