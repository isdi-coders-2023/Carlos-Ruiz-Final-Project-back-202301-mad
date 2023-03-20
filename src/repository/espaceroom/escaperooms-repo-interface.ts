export interface EscapeRoomRepo<T> {
  create(_info: Partial<T>): Promise<T>;

  search(query: { key: string; value: unknown }): Promise<T[]>;

  read(): Promise<T[]>;
  readById(id: string): Promise<T>;
  readFilter(theme: string): Promise<T[]>;
}
