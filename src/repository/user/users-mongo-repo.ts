import createDebug from 'debug';
import { User } from '../../entities/user';
import { UserModel } from './users-mongo.model.js';
import { UserRepo } from './users-repo-interface';

const debug = createDebug('MM:users:repo');

export class UsersMongoRepo implements UserRepo<User> {
  private static instance: UsersMongoRepo;

  public static getInstance(): UsersMongoRepo {
    if (!UsersMongoRepo.instance)
      UsersMongoRepo.instance = new UsersMongoRepo();
    return UsersMongoRepo.instance;
  }

  private constructor() {
    debug('Instantiate');
  }

  async create(info: Partial<User>): Promise<User> {
    debug('create');
    const data = await UserModel.create(info);
    return data;
  }

  async search(query: { key: string; value: unknown }) {
    debug('search (login)');
    const data = await UserModel.find({ [query.key]: query.value });
    return data;
  }
}
