import mongoose from 'mongoose';
import config from '../config';

export const db = (() => {
  const connect = async () => {
    try {
      await mongoose.connect(config.mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
    } catch (err) {
      console.error('Database connection error', err.message);
    }
  };

  const disconnect = async () => {
    try {
      await mongoose.connection.close();
    } catch (err) {
      console.error('Database disconnect error', err.message);
    }
  };

  const drop = async () => {
    try {
      await mongoose.connection.dropDatabase();
    } catch (err) {
      console.error('Could not drop the db', err.message);
    }
  };
  return { connect, disconnect, drop };
})();
