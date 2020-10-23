import express from 'express';
import config from './config';
import router from './routes';
import { db } from './services/db';

const app = express();

app.use(express.json());
app.use('/', router);

db.connect().then(() => {
  app.listen(config.port, () => console.log(`Server started on port ${config.port}`));
});
