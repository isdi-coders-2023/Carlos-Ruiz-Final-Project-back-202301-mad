export interface ReservationsRepo<T> {
  create(_info: Partial<T>): Promise<T>;
  delete(_id: string): Promise<void>;

  read(): Promise<T[]>;
  readByUserId(_id: string): Promise<T[]>;
  readByMonth(_monthYear: string): Promise<T[]>;
}
