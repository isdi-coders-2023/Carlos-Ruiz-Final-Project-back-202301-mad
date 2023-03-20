import { Router as router } from 'express';
import createDebug from 'debug';
import { EscapeRoomMongoRepo } from '../repository/espaceroom/escaperoom-mongo-repo.js';
import { EscapeRoomController } from '../controllers/escaperoom-controller.js';

const debug = createDebug('MM:escaperoom:router');

export const escapeRoomRouter = router();

const repoEscapeRooms = EscapeRoomMongoRepo.getInstance();
const controllerEscapeRooms = new EscapeRoomController(repoEscapeRooms);

debug('Escaperooms router');

escapeRoomRouter.get(
  '/',
  controllerEscapeRooms.findAllRooms.bind(controllerEscapeRooms)
);
escapeRoomRouter.post(
  '/create',
  controllerEscapeRooms.createRoom.bind(controllerEscapeRooms)
);
escapeRoomRouter.get(
  '/:roomId',
  controllerEscapeRooms.findRoomById.bind(controllerEscapeRooms)
);
escapeRoomRouter.get(
  '/theme/:themeElement',
  controllerEscapeRooms.findRoomByTheme.bind(controllerEscapeRooms)
);
