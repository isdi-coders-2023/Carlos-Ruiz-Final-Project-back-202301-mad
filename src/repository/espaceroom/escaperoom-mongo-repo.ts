import createDebug from 'debug';
import { EscapeRoom } from '../../entities/espaceroom';
import { UserRepo } from '../user/users-repo-interface';
import { EscapeRoomModel } from './escaperoom-mongo.model.js';

const debug = createDebug('MM:escaperooms:repo');

export class EscapeRoomMongoRepo implements UserRepo<EscapeRoom> {
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

  async readFilter(themeElement: string): Promise<EscapeRoom[]> {
    debug('readTheme');
    const data = await EscapeRoomModel.find({ theme: themeElement }).exec();
    return data;
  }
}
