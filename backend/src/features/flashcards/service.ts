import { v4 } from "uuid";
import { Service } from "./router";
import { Flashcard, Update } from "./types";

export type Repository = {
  getAll: () => Promise<Flashcard[]>;
  create: (flaschard: Flashcard) => Promise<boolean>;
  update: (index: number, update: Update) => Promise<void>;
  delete: (index: number) => Promise<void>;
};

export function createFlashcardService(repository: Repository): Service {
  return {
    async getAll() {
      return await repository.getAll();
    },

    async getById(id: string) {
      return (await repository.getAll()).find(
        (flashcard) => flashcard.id === id,
      );
    },

    async create(flashcard: Flashcard) {
      const id = v4();
      flashcard = parseFlashcard({ ...flashcard, id });
      return await repository.create(flashcard);
    },

    async update(id: string, update: Update) {
      update = parseUpdate(update);
      const flashcards = await repository.getAll();
      const index = findIndex(flashcards, id);

      if (index === -1) return false;

      await repository.update(index, update);
      return true;
    },

    async deleteById(id: string) {
      const flashcards = await repository.getAll();

      const index = findIndex(flashcards, id);

      if (index === -1) return false;

      await repository.delete(index);
      return true;
    },
  };
}

function parseFlashcard(flashcard: Flashcard) {
  return Flashcard.parse(flashcard);
}

function parseUpdate(update: Update) {
  return Update.parse(update);
}

function findIndex(flashcards: Flashcard[], id: string) {
  return flashcards.findIndex((flashcard) => flashcard.id === id);
}
