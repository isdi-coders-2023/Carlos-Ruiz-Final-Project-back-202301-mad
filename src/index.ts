import createDebug from 'debug';
import http from 'http';
import { dbConnect } from './db/db.connect';

const debug = createDebug('MM');

const PORT = process.env.PORT || 4500;

const server = http.createServer();

dbConnect().then((mongoose) => {
  server.listen(PORT);
  debug('BD ', mongoose.connection.db.databaseName);
});
