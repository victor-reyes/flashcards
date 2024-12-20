import { Flashcard, Update } from "./types";

export type Repository = {
  getAll: () => Promise<Flashcard[]>;
  create: (flaschard: Flashcard) => Promise<boolean>;
  update: (index: number, update: Update) => Promise<void>;
  delete: (index: number) => Promise<void>;
};

export function createFlashcardRepository(db: Flashcard[]): Repository {
  const flashcards = db;

  return {
    async getAll() {
      return flashcards;
    },

    async create(flashcard: Flashcard) {
      return flashcards.push(flashcard) !== undefined;
    },

    async update(index: number, update: Update) {
      flashcards[index] = { ...flashcards[index], ...update };
    },

    async delete(index: number) {
      flashcards.splice(index, 1);
    },
  };
}
