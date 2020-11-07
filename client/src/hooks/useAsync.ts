import { useState, useCallback } from 'react';
import useMounted from './useMounted';

export type IState = {
  data?: ResponseData | null;
  error?: ResponseError | null;
  status: string;
};

type ResponseData = {
  [key: string]: any;
};
type ResponseError = {
  [key: string]: any;
};

export type CallbackFn = (...vars: any[]) => Promise<Response | undefined>;

export type ReturnType = [
  (...vars: any[]) => Promise<void>,
  {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    data?: ResponseData | null;
    error?: ResponseData | null;
    status: string;
  }
];

const useSafeDispatch = <T extends Function>(callback: T): T => {
  const isMounted = useMounted();

  return (useCallback(
    (...args: any[]) => {
      if (isMounted) {
        return callback(...args);
      }
    },
    [callback, isMounted]
  ) as any) as T;
};

const initState = {
  status: 'idle',
  error: null,
  data: null,
};

const useAsync = (cb: CallbackFn): ReturnType => {
  const [state, setState] = useState<IState>(initState);

  const safeSetState = useSafeDispatch(setState);

  const setData = useCallback(
    (data: ResponseData) => {
      safeSetState({
        status: 'resolved',
        data,
      });
    },
    [safeSetState]
  );

  const setError = useCallback(
    (error: ResponseError) => {
      safeSetState({
        status: 'rejected',
        error,
      });
    },
    [safeSetState]
  );

  const run = useCallback(
    async (...vars: any[]) => {
      safeSetState({ status: 'loading' });
      try {
        const response = await cb(...vars);

        const data = await response?.json();
        if (!response?.ok) {
          // If response is not ok, throw data as it contains message about the error;
          throw { ...data }; // eslint-disable-line no-throw-literal
        }

        setData(data);
      } catch (err) {
        setError(err);
      }
    },
    [safeSetState, setData, setError, cb]
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
