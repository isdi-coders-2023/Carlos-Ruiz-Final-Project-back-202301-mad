import { Request, Response, NextFunction } from 'express';
import { EscapeRoom } from '../entities/espaceroom';
import { Repo } from '../repository/repo-interface';
import { EscapeRoomController } from './escaperoom-controller';

describe('Given the EscapeRoom controller', () => {
  const mockRepo = {
    create: jest.fn(),
  } as unknown as Repo<EscapeRoom>;

  const controller = new EscapeRoomController(mockRepo);

  const resp = {
    json: jest.fn(),
    status: jest.fn(),
  } as unknown as Response;

  const next = jest.fn() as unknown as NextFunction;

  describe('when the createRoom method is called and all OK', () => {
    test('then it should called the repo function', async () => {
      const req = {
        body: {
          name: 'test',
          players: 'test',
          difficulty: 'Easy',
          theme: 'test',
        },
      } as unknown as Request;
      await controller.createRoom(req, resp, next);
      expect(mockRepo.create).toHaveBeenCalled();
    });
    test('then the resp should be all OK', async () => {
      const req = {
        body: {
          name: 'test',
          players: 'test',
          difficulty: 'Easy',
          theme: 'test',
        },
      } as unknown as Request;
      await controller.createRoom(req, resp, next);
      expect(resp.status).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
  });
  describe('when the createRoom method is called and is NOT OK', () => {
    test('then if there is no name it should called NEXT ERROR', async () => {
      const req = {
        body: {
          players: 'test',
          difficulty: 'Easy',
          theme: 'test',
        },
      } as unknown as Request;
      await controller.createRoom(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
