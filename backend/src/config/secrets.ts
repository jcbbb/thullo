import dotenv from 'dotenv';

dotenv.config();

export type EnvType = 'development' | 'production' | 'test';

const { MONGO_URI, NODE_ENV, MONGO_URI_DEV, MONGO_URI_TEST } = process.env as {
  MONGO_URI: string;
  MONGO_URI_DEV: string;
  MONGO_URI_TEST: string;
  NODE_ENV: string;
};

const PORT = parseInt(process.env.PORT || '5000', 10);

export { MONGO_URI_DEV, MONGO_URI_TEST, MONGO_URI, NODE_ENV, PORT };
