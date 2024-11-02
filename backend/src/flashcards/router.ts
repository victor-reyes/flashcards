import { Router } from "express";
import { Flashcard, PatchedFlashcard } from ".";
import { v4 } from "uuid";

export type Repository = {
  getAll: () => Promise<Flashcard[]>;
  getBy: (id: string) => Promise<Flashcard | undefined>;
  save: (flashcard: Flashcard) => Promise<void>;
  patch: (id: string, patchedFlashcard: PatchedFlashcard) => Promise<Boolean>;
  deleteBy: (id: string) => Promise<boolean>;
};

export function createRouter(repository: Repository) {
  const router = Router();

  router.get("/", async (req, res) => {
    res.json(await repository.getAll());
  });

  router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const flaschard = await repository.getBy(id);
    if (flaschard) res.json(flaschard);
    else res.sendStatus(404);
  });

  router.post("/", async (req, res) => {
    const id = v4();
    const flashcard = Flashcard.parse({ id, ...req.body });
    await repository.save(flashcard);
    res.sendStatus(201);
  });

  router.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const patchedFlashcard = PatchedFlashcard.parse(req.body);

    if (await repository.patch(id, patchedFlashcard)) res.sendStatus(204);
    else res.sendStatus(404);
  });

  router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    if (await repository.deleteBy(id)) res.sendStatus(204);
    else res.sendStatus(404);
  });

  return router;
}
