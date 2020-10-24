import * as React from 'react';
import { useContext, useEffect, FunctionComponent } from 'react';
import { FormContext } from '../../context/FormContext';
import { IFormState } from '../../hooks/useForm';

const Step: FunctionComponent<{ name: string }> = ({ name, children }) => {
  const { setFormState, formState } = useContext(FormContext);

  useEffect(() => {
    React.Children.forEach(children, (element, index) => {
      const { name: fieldName, value, validations } = (element as any).props;
      setFormState((prev: IFormState) => ({
        ...prev,
        isFormValid: false,
        initialStepName: index === 0 ? name : null,
        navigatedStepName: null,
        [name]: {
          index,
          isStepValid: false,
          fields: {
            [fieldName]: {
              value,
              validations,
            },
          },
        },
      }));
    });
  }, [children, name, setFormState]);

  return <>{children}</>;
};

export default Step;
