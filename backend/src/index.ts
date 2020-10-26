import express from 'express';
import config from './config';
import router from './routes';
import cors from 'cors';
import { db } from './services/db';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use('/', router);

db.connect().then(() => {
  app.listen(config.port, () => console.log(`Server started on port ${config.port}`));
});
