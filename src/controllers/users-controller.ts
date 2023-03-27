import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/user';
import { HTTPError } from '../errors/errors.js';
import { RequestToken } from '../interceptors/extra-request';
import { UserRepo } from '../repository/user/users-repo-interface';
import { Auth, PayloadToken } from '../services/auth.js';

const debug = createDebug('MM:users:controller');

export class UserController {
  constructor(public repoUser: UserRepo<User>) {
    this.repoUser = repoUser;
    debug('Controller instanced');
  }

  async register(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('POST: register');

      if (!req.body.email || !req.body.password)
        throw new HTTPError(401, 'Unauthorized', 'Invalid user or password');

      req.body.password = await Auth.hash(req.body.password);

      const data = await this.repoUser.create(req.body);

      resp.status(201);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('POST: login');

      const data = await this.repoUser.search({
        key: 'email',
        value: req.body.email,
      });

      if (!data.length)
        throw new HTTPError(401, 'Unauthorized', 'Email not found');

      if (!(await Auth.compare(req.body.password, data[0].password)))
        throw new HTTPError(401, 'Unauthorized', 'PAssword not match');

      const payload: PayloadToken = {
        id: data[0].id,
        email: data[0].email,
      };
      const tokenJWT = Auth.createJWT(payload);
      const finalData = {
        token: tokenJWT,
      };

      resp.status(202);
      resp.json({
        results: [finalData],
      });
    } catch (error) {
      next(error);
    }
  }

  async edit(req: RequestToken, resp: Response, next: NextFunction) {
    try {
      debug('edit-method');

      if (!req.tokenInfo || !req.tokenInfo.id)
        throw new HTTPError(404, 'Token not found', 'Not found token');

      req.body.id = req.tokenInfo.id;

      const data = await this.repoUser.update(req.body);

      resp.status(201);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async getId(req: RequestToken, resp: Response, next: NextFunction) {
    try {
      debug('getId');

      if (!req.tokenInfo || !req.tokenInfo.id)
        throw new HTTPError(498, 'Token not found', 'Token not found');

      const userId = req.tokenInfo.id;

      const data = await this.repoUser.readId(userId);

      resp.status(202);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }
}
