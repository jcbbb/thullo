import {
  MONGO_URI,
  MONGO_URI_DEV,
  MONGO_URI_TEST,
  ORIGIN_DEV,
  ORIGIN,
  NODE_ENV,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
  SMTP_SERVER,
  SMTP_USERNAME,
  SMTP_PASSWORD,
  PORT,
} from './secrets';

export type EnvType = 'development' | 'production' | 'test';

type IConfig = {
  [key in EnvType]: {
    mongo_uri: string;
    origin: string;
    port: number;
    env: string;
    access_token_secret: string;
    refresh_token_secret: string;
    access_token_expiration: string;
    refresh_token_expiration: string;
    smtp_server: string;
    smtp_username: string;
    smtp_password: string;
  };
};

const configs: IConfig = {
  development: {
    mongo_uri: MONGO_URI_DEV,
    origin: ORIGIN_DEV,
    port: PORT,
    env: NODE_ENV,
    access_token_secret: ACCESS_TOKEN_SECRET,
    refresh_token_secret: REFRESH_TOKEN_SECRET,
    access_token_expiration: ACCESS_TOKEN_EXPIRATION,
    refresh_token_expiration: REFRESH_TOKEN_EXPIRATION,
    smtp_server: SMTP_SERVER,
    smtp_username: SMTP_USERNAME,
    smtp_password: SMTP_PASSWORD,
  },
  production: {
    mongo_uri: MONGO_URI,
    origin: ORIGIN,
    port: PORT,
    env: NODE_ENV,
    access_token_secret: ACCESS_TOKEN_SECRET,
    refresh_token_secret: REFRESH_TOKEN_SECRET,
    access_token_expiration: ACCESS_TOKEN_EXPIRATION,
    refresh_token_expiration: REFRESH_TOKEN_EXPIRATION,
    smtp_server: SMTP_SERVER,
    smtp_username: SMTP_USERNAME,
    smtp_password: SMTP_PASSWORD,
  },
  test: {
    mongo_uri: MONGO_URI_TEST,
    origin: ORIGIN_DEV,
    port: PORT,
    env: NODE_ENV,
    access_token_secret: ACCESS_TOKEN_SECRET,
    refresh_token_secret: REFRESH_TOKEN_SECRET,
    access_token_expiration: ACCESS_TOKEN_EXPIRATION,
    refresh_token_expiration: REFRESH_TOKEN_EXPIRATION,
    smtp_server: SMTP_SERVER,
    smtp_username: SMTP_USERNAME,
    smtp_password: SMTP_PASSWORD,
  },
};

export default configs;
