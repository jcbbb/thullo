import { AuthEndpoints } from './auth';

interface Entities {
  auth: (resourceUrl: string) => AuthEndpoints;
}

const API = (url: string, entities: Entities) => {
  const endpoints = {} as Entities;
  const kebabCaseToCamel = (str: string) => {
    return str.replace(/(\-\w)/g, (matches) => matches[1].toUpperCase());
  };

  for (const [name, cb] of Object.entries(entities)) {
    const cleanName = kebabCaseToCamel(name) as keyof Entities;
    endpoints[cleanName] = cb(`${url}/${cleanName}`);
  }

  return { ...endpoints };
};

export default API;
