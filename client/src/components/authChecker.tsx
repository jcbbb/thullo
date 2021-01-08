import * as React from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useAuthDispatch } from '../context/authContext';
import useAsync from '../hooks/useAsync';
import api from '../api';

const AuthChecker: React.FC = ({ children }) => {
  const authDispatch = useAuthDispatch();
  const [verifyToken, checkAuthState] = useAsync(api.auth.checkAuth);

  const checkAuth = useCallback(async () => {
    await verifyToken();
    authDispatch({ type: 'LOGIN' });
  }, [verifyToken, authDispatch]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (checkAuthState.isError) {
      authDispatch({ type: 'LOGOUT' });
    }
  }, [checkAuthState.isError, authDispatch]);

  return <>{children}</>;
};

export default AuthChecker;
