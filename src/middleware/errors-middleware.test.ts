import { NextFunction, Response, Request } from 'express';
import { errorMiddleware } from './errors-middleware';
import { Error as MongooseError } from 'mongoose';
import { HTTPError } from '../errors/errors';

describe('Given the errorMiddleware function', () => {
  const req = {} as unknown as Request;

  const resp = {
    status: jest.fn(),
    json: jest.fn(),
  } as unknown as Response;

  const next = jest.fn() as NextFunction;

  describe('when the error is MongooseError', () => {
    test('then if tit is a CastError, it should have the status given', () => {
      const error = new MongooseError.CastError('test type', 400, 'test path');
      errorMiddleware(error, req, resp, next);
      expect(resp.status).toHaveBeenLastCalledWith(400);
    });
    test('then if tit is a ValidationError, it should have the status set default', () => {
      const error = new MongooseError.ValidationError();
      errorMiddleware(error, req, resp, next);
      expect(resp.status).toHaveBeenLastCalledWith(406);
    });
  });

  describe('when is a CustomError, HTTPError with satusCode', () => {
    test('then if the status code is the one given, it return its value', () => {
      const mockCode = 418;
      const error = new HTTPError(
        mockCode,
        'test statusMessage',
        'test message'
      );
      errorMiddleware(error, req, resp, next);
      expect(resp.status).toHaveBeenLastCalledWith(mockCode);
    });
  });
  describe('when there is an Error', () => {
    test('Then the status it should be 500 (set default)', () => {
      const error = new Error('test');
      errorMiddleware(error, req, resp, next);
      expect(resp.status).toHaveBeenLastCalledWith(500);
    });
  });
});
