export interface ReservationsRepo<T> {
  create(_info: Partial<T>): Promise<T>;
  delete(_id: string): Promise<void>;

  read(): Promise<T[]>;
  readByUserId(_id: string): Promise<T[]>;
  readFilterByMonth(yearMonth: string, roomId: string): Promise<T[]>;
}
