import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/user';
import { HTTPError } from '../errors/errors';
import { UserRepo } from '../repository/user/users-repo-interface';
import { Auth } from '../services/auth';

const debug = createDebug('MM:users-controller');

export class UserController {
  constructor(public repoUser: UserRepo<User>) {
    this.repoUser = repoUser;
    debug('Controller instanced');
  }

  async register(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('POST: register');

      if (!req.body.email || req.body.password)
        throw new HTTPError(401, 'Unauthorized', 'Invalid user or password');

      req.body.password = Auth.hash(req.body.password);

      const data = await this.repoUser.create(req.body);

      resp.status(201);
      resp.json({
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}
