import { useLayoutEffect, useRef } from 'react';

const useMounted = () => {
  const mounted = useRef(false);

  useLayoutEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  return mounted;
};

export default useMounted;
