import { Db, User } from "./types";

export type Repository = {
  save: (user: User) => Promise<void>;
  getAll: () => Promise<User[]>;
};

export function createUserRepository(db: Db): Repository {
  return {
    async getAll() {
      return [...db];
    },
    async save(user) {
      db.push(user);
    },
  };
}
