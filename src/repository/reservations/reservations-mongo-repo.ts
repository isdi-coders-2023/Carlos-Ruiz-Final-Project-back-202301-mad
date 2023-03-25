import createDebug from 'debug';
import { Reservation } from '../../entities/reservation';
import { HTTPError } from '../../errors/errors.js';
import { ReservationModel } from './reservations-mongo.model.js';
import { ReservationsRepo } from './reservations-repo-interface';

const debug = createDebug('MM:reservations:repo');

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
    const data = await ReservationModel.findByIdAndDelete(id).exec();
    if (!data)
      throw new HTTPError(404, 'Not found', 'Delete not posible: id not found');
  }

  async read(): Promise<Reservation[]> {
    debug('read all');
    const data = await ReservationModel.find().exec();
    return data;
  }

  async readByUserId(id: string): Promise<Reservation[]> {
    debug('read by id');
    const data = await ReservationModel.find({ user: id })
      .populate('escaperoom', 'name players difficulty theme images')
      .exec();
    if (!data) throw new HTTPError(404, 'Not found', 'Ids not found');
    return data;
  }

  async readFilterByMonth(
    yearMonth: string,
    roomId: string
  ): Promise<Reservation[]> {
    const regexPattern = new RegExp(`^${yearMonth}`);
    const data = await ReservationModel.find({
      reserveDate: { $regex: regexPattern },
      escaperoom: roomId,
    }).exec();
    if (!data)
      throw new HTTPError(404, 'Not found', 'month or roomId not found');
    return data;
  }
}
