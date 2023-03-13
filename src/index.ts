import createDebug from 'debug';
import http from 'http';
import { app } from './app.js';
import { dbConnect } from './db/db.connect.js';

const debug = createDebug('MM');

const PORT = process.env.PORT || 4500;

const server = http.createServer(app);

dbConnect().then((mongoose) => {
  server.listen(PORT);
  debug('BD ', mongoose.connection.db.databaseName);
});

server.on('listening', () => {
  debug('Listening in http://localhost:' + PORT);
});
