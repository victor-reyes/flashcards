import { Db, Repository } from ".";

export function createUserRepository(db: Db): Repository {
  return {
    async getAll() {
      return [...db];
    },
    async save() {
      db.push();
    },
  };
}
