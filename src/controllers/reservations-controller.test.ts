import { Request, Response, NextFunction } from 'express';
import { Reservation } from '../entities/reservation';
import { ReservationsRepo } from '../repository/reservations/reservations-repo-interface';
import { ReservationController } from './reservations-controller';

describe('Given the Reservation controller', () => {
  const mockRepo = {
    create: jest.fn(),
    delete: jest.fn(),
    read: jest
      .fn()
      .mockReturnValue({ results: ['reservation1', 'reservation2'] }),
    readByUserId: jest.fn(),
    readFilterByMonth: jest.fn(),
  } as unknown as ReservationsRepo<Reservation>;

  const resp = {
    status: jest.fn(),
    json: jest.fn(),
  } as unknown as Response;

  const next = jest.fn() as unknown as NextFunction;

  const controller = new ReservationController(mockRepo);

  describe('when the createReservation is called', () => {
    test('then it should call the create method of the repo', async () => {
      const req = {
        body: {
          id: 'id test',
          reserveDate: 'date test',
          user: 'user test',
          escaperoom: 'room test',
        },
      } as unknown as Request;

      await controller.createReservation(req, resp, next);
      expect(mockRepo.create).toHaveBeenCalled();
    });
    test('then if the resp is NOT OK, it should call next error', async () => {
      const req = {
        body: {
          id: undefined,
          reserveDate: undefined,
          user: undefined,
          escaperoom: undefined,
        },
      } as unknown as Request;
      await controller.createReservation(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('when the deleteReservation is called', () => {
    test('then it should call the delete method of the repo', async () => {
      const req = {
        params: {
          resevationId: 'id test',
        },
      } as unknown as Request;

      await controller.deleteReservation(req, resp, next);
      expect(mockRepo.delete).toHaveBeenCalled();
    });
    test('then it should have called the resp status and body', async () => {
      const req = {
        params: {
          resevationId: 'id test',
        },
      } as unknown as Request;

      await controller.deleteReservation(req, resp, next);
      expect(resp.status).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
    test('then if the resp is NOT OK, it should be a next error', async () => {
      const req = {
        params: {
          reservationId: undefined,
        },
      } as unknown as Request;
      await controller.deleteReservation(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('when the findAllReservations is called', () => {
    test('then it should call the read method of the repo', async () => {
      const req = {
        params: {
          resevationId: 'id test',
        },
      } as unknown as Request;

      await controller.findAllReservations(req, resp, next);
      expect(mockRepo.read).toHaveBeenCalled();
    });
    test('then the should response the status and the json', async () => {
      const req = {
        params: {
          resevationId: 'id test',
        },
      } as unknown as Request;

      await controller.findAllReservations(req, resp, next);
      expect(resp.json).toHaveBeenCalled();
      expect(resp.status).toHaveBeenCalled();
    });
    test('then if the resp is NOT OK, it should be a next error', async () => {
      const mockFindAllRepo = {
        read: jest.fn(),
      } as unknown as ReservationsRepo<Reservation>;
      const req = {
        params: undefined,
      } as unknown as Request;
      const controllerAll = new ReservationController(mockFindAllRepo);

      await controllerAll.findAllReservations(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('when the findByUSerId is called', () => {
    test('then it should call the readByUserId method of the repo', async () => {
      const req = {
        params: {
          userId: 'id test',
        },
      } as unknown as Request;

      await controller.findByUserId(req, resp, next);
      expect(mockRepo.readByUserId).toHaveBeenCalled();
    });
    test('then the response status and the json are called', async () => {
      const req = {
        params: {
          userId: 'id test',
        },
      } as unknown as Request;

      await controller.findByUserId(req, resp, next);
      expect(resp.json).toHaveBeenCalled();
      expect(resp.status).toHaveBeenCalled();
    });
    test('then when the resp is NOT OK, there is a next error', async () => {
      const req = {
        params: {
          userId: undefined,
        },
      } as unknown as Request;

      await controller.findByUserId(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('when the findFilterByMonth is called', () => {
    test('then it should call the readByUserId method of the repo', async () => {
      const req = {
        query: {
          reserveDate: 'date test',
          escaperoom: 'escaperoom test',
        },
      } as unknown as Request;

      await controller.findFilterByMonth(req, resp, next);
      expect(mockRepo.readFilterByMonth).toHaveBeenCalled();
    });
    test('then resp json and status is called', async () => {
      const req = {
        query: {
          reserveDate: 'date test',
          escaperoom: 'escaperoom test',
        },
      } as unknown as Request;

      await controller.findFilterByMonth(req, resp, next);
      expect(resp.json).toHaveBeenCalled();
      expect(resp.status).toHaveBeenCalled();
    });
    test('then when the resp is NOT OK, there is a next error', async () => {
      const req = {
        query: {
          reserveDate: undefined,
          escaperoom: undefined,
        },
      } as unknown as Request;

      await controller.findFilterByMonth(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
