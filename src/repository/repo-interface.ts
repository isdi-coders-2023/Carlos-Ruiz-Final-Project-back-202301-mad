export interface Repo<T> {
  create(_info: Partial<T>): Promise<T>;

  search(query: { key: string; value: unknown }): Promise<T[]>;
}
