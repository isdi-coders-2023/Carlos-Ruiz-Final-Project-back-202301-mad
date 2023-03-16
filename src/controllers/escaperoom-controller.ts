import createDebug from 'debug';
import { Request, Response, NextFunction } from 'express';
import { EscapeRoom } from '../entities/espaceroom';
import { HTTPError } from '../errors/errors.js';
import { Repo } from '../repository/repo-interface';

const debug = createDebug('MM:escaperooms:controller');

export class EscapeRoomController {
  constructor(public repoEscapeRoom: Repo<EscapeRoom>) {
    this.repoEscapeRoom = repoEscapeRoom;
    debug('Controller instanced');
  }

  async createRoom(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('POST: createRoom');

      if (
        !req.body.name ||
        !req.body.theme ||
        !req.body.difficulty ||
        !req.body.players
      )
        throw new HTTPError(
          400,
          'Bad request',
          'Unable to create the escaperoom'
        );
      const data = await this.repoEscapeRoom.create(req.body);

      resp.status(201);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }
}
