import API from './base';
import { createAuthEndoints } from './auth';

const apiUrl = process.env.REACT_APP_API_URL as string;

const api = API({
  auth: createAuthEndoints(`${apiUrl}/auth`),
});

export default api;
