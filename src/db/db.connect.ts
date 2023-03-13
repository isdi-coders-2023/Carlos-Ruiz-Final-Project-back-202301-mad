import mongoose from 'mongoose';
import { config } from './db.config';

const { user, password, cluster, dbName } = config;

export const dbConnect = () => {
  const uri = `mongodb+srv://${user}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority`;
  return mongoose.connect(uri);
};
