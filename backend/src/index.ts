import express from 'express';
import config from './config';
import { db } from './services/db';

const app = express();

app.use(express.json());

db.connect().then(() => {
  app.listen(config.port, () => console.log(`Server started on port ${config.port}`));
});
