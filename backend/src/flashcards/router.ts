import { Router } from "express";
import { Flashcard } from ".";
import { v4 } from "uuid";

export type Repository = {
  getAll: () => Promise<Flashcard[]>;
  save: (flashcard: Flashcard) => Promise<void>;
  deleteBy: (id: string) => Promise<boolean>;
};

export function createRouter(repository: Repository) {
  const router = Router();

  router.get("/", async (req, res) => {
    res.json(await repository.getAll());
  });

  router.post("/", async (req, res) => {
    const id = v4();
    const flashcard = Flashcard.parse({ id, ...req.body });
    await repository.save(flashcard);
    res.sendStatus(201);
  });

  router.delete("/:id", async (req, res) => {
    console.log("fff");
    
    const id = req.params.id;
    if (await repository.deleteBy(id)) res.sendStatus(204);
    else res.sendStatus(404);
  });

  return router;
}
