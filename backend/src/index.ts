import express from 'express';
import config from './config';
import router from './routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { errorHandler } from './utils/error-handler';
import * as db from './services/db.service';
import { logger } from './utils/logger';

const app = express();

app.use(express.json());
app.use(morgan('combined'));
app.use(cookieParser());
app.use(
  cors({
    origin: config.origin,
    credentials: true,
  })
);

app.use('/', router);
app.use(errorHandler);

db.connect().then(() => {
  app.listen(config.port, () => logger.info(`Server started on port ${config.port}`));
});

process
  .on('uncaughtException', (err) => {
    logger.error('uncaughtException happened. Exiting the process', err);
    process.exit(1);
  })
  .on('unhandledRejection', (reason, p) => {
    logger.error(reason!, `unhandledRejection at ${p}`);
  });
