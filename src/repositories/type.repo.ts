/* eslint-disable no-unused-vars */
export type Repo<T, C> = {
  readAll(): Promise<T[]>;
  readById(id: string): Promise<T>;
  create(data: C): Promise<T>;
  update(id: string, data: Partial<C>): Promise<T>;
  delete(id: string): Promise<T>;
};

export type WithLoginRepo<T, C> = Repo<T, C> & {
  searchForLogin(key: 'email' | 'username', value: string): Promise<Partial<T>>;
  searchByUsername(username: string): Promise<Partial<T[]>>;
};
