import createDebug from 'debug';
import { Reservation } from '../../entities/reservation';
import { HTTPError } from '../../errors/errors';
import { ReservationModel } from './reservations-mongo.model';
import { ReservationsRepo } from './reservations-repo-interface';

const debug = createDebug('MM:escaperooms:repo');

export class ReservationMongoRepo implements ReservationsRepo<Reservation> {
  private static instance: ReservationMongoRepo;

  public static getInstance(): ReservationMongoRepo {
    if (!ReservationMongoRepo.instance)
      ReservationMongoRepo.instance = new ReservationMongoRepo();
    return ReservationMongoRepo.instance;
  }

  private constructor() {
    debug('Instantiate');
  }

  async create(info: Partial<Reservation>): Promise<Reservation> {
    debug('create');
    const data = await ReservationModel.create(info);
    return data;
  }

  async delete(id: string): Promise<void> {
    debug('delete');
    const data = await ReservationModel.findByIdAndDelete(id);
    if (!data)
      throw new HTTPError(404, 'Not found', 'Delete not posible: id not found');
  }

  read(): Promise<Reservation[]> {
    throw new Error('Method not implemented.');
  }

  readByUserId(_id: string): Promise<Reservation[]> {
    throw new Error('Method not implemented.');
  }

  readByMonth(_monthYear: string): Promise<Reservation[]> {
    throw new Error('Method not implemented.');
  }
}
