import { Repository } from "../router";
import { Flashcard } from "../types";

export function createFlashcardRepository(db: Flashcard[]): Repository {
  const flashcards = db;

  return {
    async getAll() {
      return flashcards;
    },

    async getBy(id: string) {
      return flashcards.find((flashcard) => flashcard.id === id);
    },

    async save(flashcard: Flashcard) {
      flashcards.push(flashcard);
    },

    async patch(id, patchedFlashcard) {
      const index = flashcards.findIndex((flashcard) => flashcard.id === id);
      if (index !== -1) {
        flashcards[index] = { ...flashcards[index], ...patchedFlashcard };
        return true;
      }
      return false;
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
