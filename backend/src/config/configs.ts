import { MONGO_URI, MONGO_URI_DEV, MONGO_URI_TEST, NODE_ENV, PORT } from './secrets';

export type EnvType = 'development' | 'production' | 'test';

type IConfig = {
  [key in EnvType]: {
    mongoUri: string;
    port: number;
    env: string;
  };
};

const configs: IConfig = {
  development: {
    mongoUri: MONGO_URI_DEV,
    port: PORT,
    env: NODE_ENV,
  },
  production: {
    mongoUri: MONGO_URI,
    port: PORT,
    env: NODE_ENV,
  },
  test: {
    mongoUri: MONGO_URI_TEST,
    port: PORT,
    env: NODE_ENV,
  },
};

export default configs;

