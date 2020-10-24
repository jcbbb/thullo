import * as React from 'react';
import { createContext, FunctionComponent } from 'react';
import useForm from '../hooks/useForm';
import { IFormState } from '../hooks/useForm';

type IContext = {
  formState: IFormState;
  setFormState: any;
};
export const FormContext = createContext<Partial<IContext>>({});

const FormContextProvider: FunctionComponent = ({ children }) => {
  const { setFormState, formState } = useForm();
  return (
    <FormContext.Provider value={{ setFormState, formState }}>{children}</FormContext.Provider>
  );
};

export default FormContextProvider;
