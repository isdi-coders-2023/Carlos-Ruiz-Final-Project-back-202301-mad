import { Request, Response, NextFunction } from 'express';
import { EscapeRoom } from '../entities/espaceroom';
import { EscapeRoomRepo } from '../repository/espaceroom/escaperooms-repo-interface';
import { EscapeRoomController } from './escaperoom-controller';

describe('Given the EscapeRoom controller', () => {
  const mockRepo = {
    create: jest.fn(),
    read: jest.fn().mockReturnValue({ results: ['room1', 'room2'] }),
    readFilter: jest.fn(),
  } as unknown as EscapeRoomRepo<EscapeRoom>;

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

  describe('when the findAllRooms method is called', () => {
    test('then if everything is OK it', async () => {
      const req = {} as unknown as Request;

      await controller.findAllRooms(req, resp, next);

      expect(resp.status).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
    test('then if there is NO DATA from the repo is should throw an error', async () => {
      const mockFindAllRepo = {
        create: jest.fn(),
        read: jest.fn(),
        readFilter: jest.fn(),
      } as unknown as EscapeRoomRepo<EscapeRoom>;

      const controllerAll = new EscapeRoomController(mockFindAllRepo);
      const req = {} as unknown as Request;

      await controllerAll.findAllRooms(req, resp, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('when the findRoomByTheme method is called and is OK', () => {
    test('then if there is a themeElement is should expect status and json', async () => {
      const req = {
        params: {
          themeElement: 'Fantasy',
        },
      } as unknown as Request;
      await controller.findRoomByTheme(req, resp, next);
      expect(resp.status).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
  });
  describe('when the findRoomByTheme method is called and is NOT OK', () => {
    test('then if there is NO themeElelemnt is should throw error NEXT', async () => {
      const req = {
        params: {
          themeElement: undefined,
        },
      } as unknown as Request;
      await controller.findRoomByTheme(req, resp, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
