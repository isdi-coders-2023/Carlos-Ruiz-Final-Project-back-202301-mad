import { NextFunction, Response } from 'express';
import { ExtraRequest } from '../services/extra-request';
import { logged } from './logged';

jest.mock('../services/auth');

describe('Given the interceptors class (LOGGED)', () => {
  const mockReq = {
    get: jest.fn(),
  } as unknown as ExtraRequest;

  const resp = {} as Response;

  const next = jest.fn() as unknown as NextFunction;

  describe('when !authHeaderInfo', () => {
    (mockReq.get as jest.Mock).mockReturnValue(undefined);
    test('then it should call next error', () => {
      logged(mockReq, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('when authHeaderInfo not start with Bearer', () => {
    test('then it should call next error', () => {
      (mockReq.get as jest.Mock).mockReturnValue('Bear');
      logged(mockReq, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('when authHeaderInfo is Ok', () => {
    test('then it should call the next function passing by the Auth verification', () => {
      (mockReq.get as jest.Mock).mockReturnValue('Bearer testToken');
      logged(mockReq, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
