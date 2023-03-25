export interface UserRepo<T> {
  create(_info: Partial<T>): Promise<T>;
  search(query: { key: string; value: unknown }): Promise<T[]>;
  readId(id: string): Promise<T>;
  update(user: Partial<T>): Promise<T>;
}
