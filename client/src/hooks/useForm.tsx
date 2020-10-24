import { useState } from 'react';

export interface IValidation {
  rule(value: any): boolean;
  message: string;
}

export interface IField {
  value?: string;
  validations?: IValidation[];
}

interface IStep {
  [key: string]: {
    isStepValid?: boolean;
    fields?: Record<string, IField>;
  };
}

export type IFormState = IStep & {
  isFormValid?: boolean;
  currentStep?: IStep;
  initialStepName?: string;
  navigatedStepName?: string;
};

const useForm = () => {
  const [formState, setFormState] = useState<IFormState>({});

  return { setFormState, formState };
};

export default useForm;
