import express from 'express';
import createDebug from 'debug';
import morgan from 'morgan';
import cors from 'cors';
import { usersRouter } from './routers/users-router.js';
import { escapeRoomRouter } from './routers/escaperoom-router.js';
import { reservationRouter } from './routers/reservations-router.js';
import { errorMiddleware } from './middleware/errors-middleware.js';

const debug = createDebug('MM:App');

debug('APP init');

export const app = express();

app.disable('x-powered-by');
const corsOptions = {
  origin: '*',
};
app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));

// App routers
app.use('/users', usersRouter);
app.use('/reservations', reservationRouter);
app.use('/escaperooms', escapeRoomRouter);

app.use(errorMiddleware);

app.get('/', (_req, resp) => {
  resp.json({
    info: 'Main',
    endpoints: {
      users: '/users',
      escaperooms: '/escaperooms',
      reservations: '/reservations',
    },
  });
});
