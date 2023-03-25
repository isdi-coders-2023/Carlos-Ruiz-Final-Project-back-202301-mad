/* eslint-disable @typescript-eslint/no-unused-vars */
import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { CustomError, HTTPError } from '../errors/errors.js';
import { Error as MongooseError } from 'mongoose';

const debug = createDebug('MM:Middleware:Errors');

export const errorMiddleware = (
  error: CustomError | Error,
  _req: Request,
  resp: Response,
  _next: NextFunction
) => {
  let status = 500;
  let statusMessage = 'Internal server error';

  if (error instanceof MongooseError.CastError) {
    status = 400;
    statusMessage = 'Bad formatted data in the request';
  }

  if (error instanceof MongooseError.ValidationError) {
    status = 406;
    statusMessage = 'Validation error in the request';
  }

  if (error instanceof HTTPError) {
    statusMessage = error.statusMessage;
    status = error.statusCode;
  }

  debug(status, statusMessage, error.message);

  resp.status(status);
  resp.json({
    error: [
      {
        status,
        statusMessage,
      },
    ],
  });
};
