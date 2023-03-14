import { Auth } from './auth';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

jest.mock('jsonwebtoken');
jest.mock('bcryptjs');

describe('Given the Auth class ', () => {
  describe('when we call the createJWT', () => {
    const payloadMock = {
      id: '1',
      email: 'test',
    };
    test('then if we receive PayloadToken, it should be called', () => {
      Auth.createJWT(payloadMock);
      expect(jwt.sign).toHaveBeenCalled();
    });
  });
  describe('when we call the verifyJWTPayload', () => {
    const tokenMock = 'test';
    const payloadMock = {
      id: '1',
      email: 'test',
    };
    test('then if we receive PayloadToken correctly, it should be called', () => {
      (jwt.verify as jest.Mock).mockReturnValue(payloadMock);
      Auth.verifyJWTPayload(tokenMock);
      expect(jwt.verify).toHaveBeenCalled();
    });
    test('then if we receive an unvalid PayloadToken, it should throw an error', () => {
      (jwt.verify as jest.Mock).mockReturnValue('string');
      expect(() => Auth.verifyJWTPayload(tokenMock)).toThrow();
    });
  });
  describe('when we call the hash function', () => {
    test('then it should call the bcrypt.hash function', () => {
      Auth.hash('test');
      expect(bcrypt.hash).toHaveBeenCalled();
    });
  });
  describe('when we call the compare fuction', () => {
    test('then it should call the bcrypt.compare function', () => {
      Auth.compare('test', 'testHash');
      expect(bcrypt.compare).toHaveBeenCalled();
    });
  });
});
