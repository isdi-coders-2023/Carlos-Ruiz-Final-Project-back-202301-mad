import createDebug from 'debug';
import { Request, Response, NextFunction } from 'express';
import { Reservation } from '../entities/reservation';
import { HTTPError } from '../errors/errors.js';
import { ReservationsRepo } from '../repository/reservations/reservations-repo-interface';
import { RequestToken } from '../interceptors/extra-request';

const debug = createDebug('MM:reservations:controller');

export class ReservationController {
  constructor(public repoReservation: ReservationsRepo<Reservation>) {
    this.repoReservation = repoReservation;
    debug('Controller instanced');
  }

  async createReservation(
    req: RequestToken,
    resp: Response,
    next: NextFunction
  ) {
    try {
      debug('POST: createReservation');

      if (!req.tokenInfo || !req.tokenInfo.id)
        throw new HTTPError(404, 'Token not found', 'Not found token');

      const userId = req.tokenInfo.id;

      req.body.user = userId;
      if (!req.body.reserveDate || !req.body.escaperoom)
        throw new HTTPError(
          400,
          'Bad request',
          'Unable to cerate a reservation'
        );

      const data = await this.repoReservation.create(req.body);

      resp.status(201);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteReservation(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('DELETE reservation');
      if (!req.params.reservationId) {
        throw new HTTPError(404, 'Not found', 'Reservation ID not found');
      }

      await this.repoReservation.delete(req.params.reservationId);

      resp.status(204);
      resp.json({
        results: [],
      });
    } catch (error) {
      next(error);
    }
  }

  async findAllReservations(req: Request, resp: Response, next: NextFunction) {
    try {
      debug(`GET All`);

      const data = await this.repoReservation.read();

      if (!data)
        throw new HTTPError(404, 'Not found', 'Reservations not found');

      resp.status(201);
      resp.json({
        results: data,
      });
    } catch (error) {
      next(error);
    }
  }

  async findByUserId(req: RequestToken, resp: Response, next: NextFunction) {
    try {
      debug('Get user reservations');

      if (!req.tokenInfo || !req.tokenInfo.id)
        throw new HTTPError(404, 'Token not found', 'Not found token');

      const userId = req.tokenInfo.id;

      const data = await this.repoReservation.readByUserId(userId);

      resp.status(201);
      resp.json({
        results: data,
      });
    } catch (error) {
      next(error);
    }
  }

  async findFilterByMonth(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('GET reservations month');

      if (!req.query.reserveDate || !req.query.escaperoom)
        throw new HTTPError(
          400,
          'Bad filter request',
          `The query is incorrect: date-${req.query.reserveDate} escaperoom-${req.query.escaperoom}`
        );

      const data = await this.repoReservation.readFilterByMonth(
        req.query.reserveDate as string,
        req.query.escaperoom as string
      );

      resp.status(201);
      resp.json({
        results: data,
      });
    } catch (error) {
      next(error);
    }
  }
}
