import API from './base';
import { createAuthEndoints } from './auth';
import { createUnsplashEndpoints } from './unsplash';
import { createBoardEndoints } from './board';

const apiUrl = process.env.REACT_APP_API_URL as string;

const api = API({
  auth: createAuthEndoints(`${apiUrl}/auth`),
  unsplash: createUnsplashEndpoints('https://api.unsplash.com'),
  board: createBoardEndoints(`${apiUrl}/boards`)
});

export default api;
