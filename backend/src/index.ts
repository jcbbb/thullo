import express from 'express';
import config from './config'
import router from './routes';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import { errorHandler } from './utils/error-handler'
import { db } from './services/db.service';

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(
  cors({
    origin: config.origin,
    credentials: true,
  }),
);

app.use('/', router);
app.use(errorHandler)

db.connect().then(() => {
  app.listen(config.port, () => console.log(`Server started on port ${config.port}`));
});
