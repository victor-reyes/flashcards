import { Repository } from "../router";
import { Flashcard } from "../types";

export function createRepository(db: Array<Flashcard>): Repository {
  const flashcards = db;

  return {
    async getAll() {
      return flashcards;
    },

    async save(flashcard: Flashcard) {
      flashcards.push(flashcard);
    },
  };
}
