import { useState, useCallback } from 'react';

export type IState = {
  data?: ResponseData | null;
  error?: ResponseError | null;
  status: string;
};

type ResponseData = {
  [key: string]: string;
};

type ResponseError = {
  [key: string]: string;
};

export type CallbackFn = (...vars: any) => Promise<Response | undefined>;
export type ReturnType = [
  (...vars: any) => Promise<void>,
  {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    data?: ResponseData | null;
    error?: ResponseData | null;
    status: string;
  }
];

const useAsync = (cb: CallbackFn): ReturnType => {
  const initState = {
    status: 'idle',
    error: null,
    data: null,
  };

  const [state, setState] = useState<IState>(initState);

  const run = useCallback(
    async (...vars: any) => {
      setState((prevState) => ({ ...prevState, status: 'loading' }));
      try {
        const response = await cb(...vars);

        const data = await response?.json();
        if (!response?.ok) {
          // If response is not ok, throw data as it contains message about the error;
          throw { ...data }; // eslint-disable-line no-throw-literal
        }

        setState((prevState) => ({
          ...prevState,
          status: 'resolved',
          data,
          error: null,
        }));
      } catch (err) {
        setState((prevState) => ({
          ...prevState,
          status: 'rejected',
          error: err,
          data: null,
        }));
      }
    },
    [setState, cb]
  );

  return [
    run,
    {
      ...state,
      isError: state.status === 'rejected',
      isSuccess: state.status === 'resolved',
      isLoading: state.status === 'loading',
    },
  ];
};

export default useAsync;
