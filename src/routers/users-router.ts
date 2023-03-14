import { Router as router } from 'express';
import createDebug from 'debug';
import { UsersMongoRepo } from '../repository/user/users-mongo-repo.js';
import { UserController } from '../controllers/users-controller.js';

const debug = createDebug('MM:users:router');

export const usersRouter = router();
const repoUsers = UsersMongoRepo.getInstance();
const controllerUsers = new UserController(repoUsers);

debug('Users router');

usersRouter.post('/register', controllerUsers.register.bind(controllerUsers));
usersRouter.post('/login', controllerUsers.login.bind(controllerUsers));
