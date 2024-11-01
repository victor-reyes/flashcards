import { Repository } from "../router";
import { Flashcard } from "../types";

export function createRepository(): Repository {
  const flashcards = new Array<Flashcard>();

  return {
    async getAll() {
      return flashcards;
    },

    async save(flashcard: Flashcard) {
      flashcards.push(flashcard);
    },
  };
}
