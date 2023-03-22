import { Router as router } from 'express';
import createDebug from 'debug';
import { ReservationMongoRepo } from '../repository/reservations/reservations-mongo-repo.js';
import { ReservationController } from '../controllers/reservations-controller.js';

const debug = createDebug('MM:reservations:router');

export const reservationRouter = router();

const repoReservations = ReservationMongoRepo.getInstance();
const controllerReservations = new ReservationController(repoReservations);

debug('Reservations router');

reservationRouter.get(
  '/',
  controllerReservations.findAllReservations.bind(controllerReservations)
);
reservationRouter.post(
  '/create',
  controllerReservations.createReservation.bind(controllerReservations)
);
reservationRouter.delete(
  '/delete/:reservationId',
  controllerReservations.deleteReservation.bind(controllerReservations)
);
reservationRouter.get(
  '/user/:userId',
  controllerReservations.findByUserId.bind(controllerReservations)
);
reservationRouter.get(
  '/filter',
  controllerReservations.findFilterByMonth.bind(controllerReservations)
);
