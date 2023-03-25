import createDebug from 'debug';
import { User } from '../../entities/user';
import { HTTPError } from '../../errors/errors.js';
import { UserModel } from './users-mongo.model.js';
import { UserRepo } from './users-repo-interface';

const debug = createDebug('MM:users:repo');

export class UsersMongoRepo implements Partial<UserRepo<User>> {
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

  async readId(id: string): Promise<User> {
    debug('readID-method');
    const data = await UserModel.findById(id).exec();
    if (!data) throw new HTTPError(404, 'Not found', 'ID not found in readID');
    return data;
  }

  async update(user: Partial<User>) {
    debug('update user');
    const data = await UserModel.findByIdAndUpdate(user.id, user, {
      new: true,
    }).exec();
    if (!data) throw new HTTPError(404, 'Not found', 'ID not found in update');
    return data;
  }
}
