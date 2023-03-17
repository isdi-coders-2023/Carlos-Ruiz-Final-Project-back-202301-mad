import { Router as router } from 'express';
import createDebug from 'debug';
import { EscapeRoomMongoRepo } from '../repository/espaceroom/escaperoom-mongo-repo';
import { EscapeRoomController } from '../controllers/escaperoom-controller';

const debug = createDebug('MM:escaperoom:router');

export const escapeRoomRouter = router();

const repoEscapeRooms = EscapeRoomMongoRepo.getInstance();
const controllerEscapeRooms = new EscapeRoomController(repoEscapeRooms);

debug('Escaperooms router');

escapeRoomRouter.post(
  '/create',
  controllerEscapeRooms.createRoom.bind(controllerEscapeRooms)
);
