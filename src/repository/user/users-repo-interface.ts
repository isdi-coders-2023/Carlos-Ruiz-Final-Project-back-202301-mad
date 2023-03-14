export interface UserRepo<T> {
  create(_info: Partial<T>): Promise<T>;

  search(query: { key: string; value: unknown }): Promise<T[]>;
}
