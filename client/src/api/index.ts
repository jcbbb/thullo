import API from './base';
import { createAuthEndpoints } from './auth';
import { createUnsplashEndpoints } from './unsplash';
import { createBoardEndpoints } from './board';
import { createUserEndpoints } from './user';

const apiUrl = process.env.REACT_APP_API_URL as string;

const api = API({
  auth: createAuthEndpoints(`${apiUrl}/auth`),
  unsplash: createUnsplashEndpoints('https://api.unsplash.com'),
  board: createBoardEndpoints(`${apiUrl}/boards`),
  user: createUserEndpoints(`${apiUrl}/users`),
});

export default api;
