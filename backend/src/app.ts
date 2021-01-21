import express from 'express';
import config from './config';
import router from './routes';
import cors from 'cors';
import cookie_parser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import { global_logger } from './utils/global-logger';
import { error_handler, logger, not_found_handler, request_id } from './utils';
import * as db from './services/db.service';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('combined'));
app.use(cookie_parser());
app.use(
  cors({
    origin: config.origin,
    credentials: true,
  })
);

app.use(request_id());
app.use(
  global_logger({
    capture_response_body: true,
    capture_request_body: true,
  })
);
app.use('/api', router);
app.use(error_handler);
app.use('*', not_found_handler);

db.connect()
  .then(() => logger.info('Database connected'))
  .catch((err) => logger.error(`Database connection error ${err}`));

process
  .on('uncaughtException', (err) => {
    logger.error('uncaughtException happened. Exiting the process', err);
    process.exit(1);
  })
  .on('unhandledRejection', (reason, p) => {
    logger.error(reason!, `unhandledRejection at ${p}`);
  });

export default app;
