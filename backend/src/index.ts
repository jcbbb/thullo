import express from 'express';
import config from './config';

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello world!' }).status(200);
});

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});
