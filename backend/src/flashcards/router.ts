import { Router } from "express";
import { Flashcard } from ".";
import { v4 } from "uuid";

export type Repository = {
  getAll: () => Promise<Flashcard[]>;
  save: (flashcard: Flashcard) => Promise<void>;
};

export function createRouter(repository: Repository) {
  const router = Router();

  router.get("/", async (req, res) => {
    res.json(await repository.getAll());
  });

  router.post("/", async (req, res) => {
    const { question, answer } = req.body;
    const id = v4();
    const flashcard = Flashcard.parse({ id, question, answer });
    await repository.save(flashcard);
    res.sendStatus(201);
  });

  return router;
}
