import { IAuthEndpoints } from './auth';
import { kebabCaseToCamel } from '../utils';

interface Entities {
  auth: IAuthEndpoints;
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
