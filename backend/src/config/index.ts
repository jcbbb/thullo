import { MONGO_URI, MONGO_URI_DEV, MONGO_URI_TEST, PORT, NODE_ENV } from './secrets';

type IConfig = {
  mongoUri: string;
  port: number;
  env: string;
  isProd: boolean;
  isDev: boolean;
  isTest: boolean;
};

const isProd = NODE_ENV === 'production';
const isDev = NODE_ENV === 'development';
const isTest = NODE_ENV === 'test';

const config: IConfig = {
  mongoUri: isDev ? MONGO_URI_DEV : isProd ? MONGO_URI : MONGO_URI_TEST,
  port: PORT,
  env: NODE_ENV,
  isProd,
  isDev,
  isTest,
};

export default config;
