import { Router as router } from 'express';
import createDebug from 'debug';
import { UsersMongoRepo } from '../repository/user/users-mongo-repo.js';
import { UserController } from '../controllers/users-controller.js';
import { logged } from '../interceptors/logged.js';

const debug = createDebug('MM:users:router');

export const usersRouter = router();
const repoUsers = UsersMongoRepo.getInstance();
const controllerUsers = new UserController(repoUsers);

debug('Users router');

usersRouter.post('/register', controllerUsers.register.bind(controllerUsers));
usersRouter.post('/login', controllerUsers.login.bind(controllerUsers));
usersRouter.patch(
  '/profile',
  logged,
  controllerUsers.edit.bind(controllerUsers)
);
usersRouter.get(
  '/profile',
  logged,
  controllerUsers.getId.bind(controllerUsers)
);
