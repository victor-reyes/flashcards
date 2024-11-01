import { Repository } from "../router";

export function createRepository(): Repository {
  return {
    async getAll() {
      return [];
    },
  };
}
