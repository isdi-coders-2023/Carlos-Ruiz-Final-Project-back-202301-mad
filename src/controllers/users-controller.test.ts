import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/user';
import { UserRepo } from '../repository/user/users-repo-interface';
import { Auth } from '../services/auth';
import { UserController } from './users-controller';

jest.mock('../services/auth.js');
jest.mock('../db/db-config.js', () => ({
  config: {
    secret: 'test',
  },
}));

describe('Given the users controller', () => {
  const mockPasswd = 'test';

  const mockRepo = {
    create: jest.fn(),
    search: jest.fn(),
  } as unknown as UserRepo<User>;

  const controller = new UserController(mockRepo);

  const resp = {
    json: jest.fn(),
    status: jest.fn(),
  } as unknown as Response;

  const next = jest.fn() as unknown as NextFunction;

  describe('when the register method is called', () => {
    test('then if all is OK it should return the resp OK', async () => {
      const req = {
        body: {
          email: 'a@test.com',
          password: mockPasswd,
        },
      } as unknown as Request;

      await controller.register(req, resp, next);
      expect(mockRepo.create).toHaveBeenCalled();
      expect(resp.status).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
    test('then if email or/and password are WRONG, should return next', async () => {
      const req = {
        body: {
          password: mockPasswd,
        },
      } as unknown as Request;

      await controller.register(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('when the login method is called', () => {
    test('then if all is OK it should return the data', async () => {
      const req = {
        body: {
          email: 'a@test.com',
          password: mockPasswd,
        },
      } as unknown as Request;

      await controller.login(req, resp, next);
      (mockRepo.search as jest.Mock).mockReturnValue(['test']);
      Auth.compare = jest.fn().mockResolvedValue(true);

      expect(mockRepo.search).toHaveBeenCalled();
      expect(resp.status).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
    test('then if there is no email, it should return next', async () => {
      const req = {
        body: {
          password: mockPasswd,
        },
      } as unknown as Request;

      await controller.login(req, resp, next);

      expect(next).toHaveBeenCalled();
    });
    test('then if there is no password, it should return next', async () => {
      const req = {
        body: {
          email: 'test',
        },
      } as unknown as Request;

      await controller.login(req, resp, next);

      expect(next).toHaveBeenCalled();
    });
    test('then if you receive the repoUser.search empty, it should return next', async () => {
      const req = {
        body: {
          email: 'a@test.com',
          password: mockPasswd,
        },
      } as unknown as Request;

      (mockRepo.search as jest.Mock).mockReturnValue([]);
      await controller.login(req, resp, next);

      expect(next).toHaveBeenCalled();
    });
    test('then if you receive the body well, but the compare method is false, it should return next', async () => {
      const req = {
        body: {
          email: 'a@test.com',
          password: mockPasswd,
        },
      } as unknown as Request;

      (mockRepo.search as jest.Mock).mockReturnValue(['test']);
      Auth.compare = jest.fn().mockResolvedValue(false);
      await controller.login(req, resp, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
