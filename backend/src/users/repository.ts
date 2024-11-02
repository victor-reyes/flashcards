import { Db, Repository, User } from ".";

export function createUserRepository(db: Db): Repository {
  return {
    async register(user: User) {
      return db.has(user) ? false : db.add(user) && true;
    },
  };
}
