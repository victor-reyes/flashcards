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

    async deleteBy(id: string) {
      const index = flashcards.findIndex((flashcard) => flashcard.id === id);
      if (index !== -1) {
        flashcards.splice(index, 1);
        return true;
      }
      return false;
    },
  };
}
