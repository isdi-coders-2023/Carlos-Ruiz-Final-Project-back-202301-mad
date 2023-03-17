import createDebug from 'debug';
import { Request, Response, NextFunction } from 'express';
import { EscapeRoom } from '../entities/espaceroom';
import { HTTPError } from '../errors/errors.js';
import { EscapeRoomRepo } from '../repository/espaceroom/escaperooms-repo-interface';

const debug = createDebug('MM:escaperooms:controller');

export class EscapeRoomController {
  constructor(public repoEscapeRoom: EscapeRoomRepo<EscapeRoom>) {
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

  async findAllRooms(_req: Request, resp: Response, next: NextFunction) {
    try {
      debug(`GET All`);

      const data = await this.repoEscapeRoom.read();

      if (!data) throw new HTTPError(404, 'Not found', 'Escaperooms not found');

      resp.status(201);
      resp.json({
        results: data,
      });
    } catch (error) {
      next(error);
    }
  }

  async findRoomByTheme(req: Request, resp: Response, next: NextFunction) {
    try {
      debug(`GET - ${req.params.themeElement}`);

      if (!req.params.themeElement)
        throw new HTTPError(
          400,
          'Bad request',
          `Filter ${req.params.themeElement} not found`
        );

      const roomFiltered = await this.repoEscapeRoom.readFilter(
        req.params.themeElement
      );

      resp.status(201);
      resp.json({
        results: roomFiltered,
      });
    } catch (error) {
      next(error);
    }
  }
}
