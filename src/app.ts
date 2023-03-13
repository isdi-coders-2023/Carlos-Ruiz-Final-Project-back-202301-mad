import express, { NextFunction, Request, Response } from 'express';
import createDebug from 'debug';
import morgan from 'morgan';
import cors from 'cors';
import { CustomError } from './errors/errors.js';

const debug = createDebug('MM:App');

export const app = express();

app.disable('x-powered-by');
const corsOptions = {
  origin: '*',
};
app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));

// App routers

app.get('/', (_req, resp) => {
  resp.json({
    info: 'Main',
    endpoints: {},
  });
});

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: CustomError, _req: Request, resp: Response, _next: NextFunction) => {
    debug('Errors middleware');
    const status = error.statusCode || 500;
    const statusMessage = error.statusMessage || 'Internal server error';
    resp.status(status);
    resp.json({ error: [{ status, statusMessage }] });
    debug(status, statusMessage, error.message);
  }
);
