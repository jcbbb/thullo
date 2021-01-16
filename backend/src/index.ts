import express from 'express';
import config from './config';
import router from './routes';
import cors from 'cors';
import cookie_parser from 'cookie-parser';
import morgan from 'morgan';
import { error_handler, logger, not_found_handler } from './utils';
import * as db from './services/db.service';

const app = express();

app.use(express.json());
app.use(morgan('combined'));
app.use(cookie_parser());
app.use(
  cors({
    origin: config.origin,
    credentials: true,
  })
);

app.use('/', router);
app.use(error_handler);
app.use('*', not_found_handler);

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
