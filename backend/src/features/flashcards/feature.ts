import { createFlashcardRepository } from "./repository";
import { createFlashcardRouter } from "./router";
import { createFlashcardService } from "./service";
import { Flashcard } from "./types";

export function createFlaschardsFeature(db: Flashcard[]) {
  const flashcardRepository = createFlashcardRepository(db);
  const flashcardService = createFlashcardService(flashcardRepository);
  const flashcardRouter = createFlashcardRouter(flashcardService);

  return { flashcardRepository, flashcardService, flashcardRouter };
}
