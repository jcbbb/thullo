import app from './app';
import config from './config';
import { logger } from './utils';

app.listen(config.port, () => logger.info(`Server started on port ${config.port}`));
