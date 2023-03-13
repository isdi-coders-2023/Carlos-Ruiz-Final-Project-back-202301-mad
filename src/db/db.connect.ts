import mongoose from 'mongoose';
import { config } from './db.config.js';

const { user, password, cluster, dbName } = config;

export const dbConnect = () => {
  const DBNameCondition =
    // The dbName is change here, not in .env -> for the supertest to work!
    // eslint-disable-next-line no-negated-condition
    process.env.NODE_ENV !== 'test' ? dbName : 'testing_maze_manor';
  const uri = `mongodb+srv://${user}:${password}@${cluster}/${DBNameCondition}?retryWrites=true&w=majority`;
  return mongoose.connect(uri);
};
