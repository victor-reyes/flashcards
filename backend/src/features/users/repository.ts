import { Repository } from "./service";
import { Db } from "./types";

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
