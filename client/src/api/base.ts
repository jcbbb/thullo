import { IAuthEndpoints } from './auth';
import { kebabCaseToCamel } from '../utils';
import { IUnsplashEnpoints } from './unsplash';
import { IBoardEndpoints } from './board';

interface Entities {
  auth: IAuthEndpoints;
  unsplash: IUnsplashEnpoints;
  board: IBoardEndpoints;
}

const API = (entities: Entities) => {
  const endpoints = {} as Entities;

  for (const [name, methods] of Object.entries(entities)) {
    const cleanName = kebabCaseToCamel(name) as keyof Entities;
    endpoints[cleanName] = methods;
  }

  return { ...endpoints };
};

export default API;
