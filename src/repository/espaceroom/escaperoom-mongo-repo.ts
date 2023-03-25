import createDebug from 'debug';
import { EscapeRoom } from '../../entities/espaceroom';
import { HTTPError } from '../../errors/errors.js';
import { EscapeRoomModel } from './escaperoom-mongo.model.js';
import { EscapeRoomRepo } from './escaperooms-repo-interface';

const debug = createDebug('MM:escaperooms:repo');

export class EscapeRoomMongoRepo implements EscapeRoomRepo<EscapeRoom> {
  private static instance: EscapeRoomMongoRepo;

  public static getInstance(): EscapeRoomMongoRepo {
    if (!EscapeRoomMongoRepo.instance)
      EscapeRoomMongoRepo.instance = new EscapeRoomMongoRepo();
    return EscapeRoomMongoRepo.instance;
  }

  private constructor() {
    debug('Instantiate');
  }

  async create(info: Partial<EscapeRoom>): Promise<EscapeRoom> {
    debug('create');
    const data = await EscapeRoomModel.create(info);
    return data;
  }

  async search(query: { key: string; value: unknown }) {
    debug('search (login)');
    const data = await EscapeRoomModel.find({ [query.key]: query.value });
    return data;
  }

  async read(): Promise<EscapeRoom[]> {
    debug('read all');
    const data = await EscapeRoomModel.find().exec();
    return data;
  }

  async readById(roomId: string): Promise<EscapeRoom> {
    debug('read ID');
    const data = await EscapeRoomModel.findById(roomId).exec();
    if (!data) throw new HTTPError(404, 'Not found', 'Id not found');
    return data;
  }

  async readFilter(themeElement: string): Promise<EscapeRoom[]> {
    debug('readTheme');
    const data = await EscapeRoomModel.find({ theme: themeElement }).exec();
    if (!data) throw new HTTPError(404, 'Not found', 'Theme not found');
    return data;
  }
}
