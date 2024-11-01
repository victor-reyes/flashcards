import { Router } from "express";

export type Repository = {
  getAll: () => Promise<Flashcard[]>;
};

export function createRouter(repository: Repository) {
  const router = Router();

  router.get("/", async (req, res) => {
    res.json(await repository.getAll());
  });

  return router;
}
