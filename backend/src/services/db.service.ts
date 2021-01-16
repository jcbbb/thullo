import mongoose from 'mongoose';
import config from '../config';

export const connect = async () => {
  try {
    await mongoose.connect(config.mongo_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  } catch (err) {
    console.error('Database connection error', err.message);
  }
};

export const disconnect = async () => {
  try {
    await mongoose.connection.close();
  } catch (err) {
    console.error('Database disconnect error', err.message);
  }
};

export const drop = async () => {
  try {
    await mongoose.connection.dropDatabase();
  } catch (err) {
    console.error('Could not drop the db', err.message);
  }
};
