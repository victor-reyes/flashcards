import { Router } from "express";
import { Flashcard } from ".";

export type Service = {
  getAll: () => Promise<Flashcard[]>;
  getById: (id: string) => Promise<Flashcard | undefined>;
  create: (flashcard: Flashcard) => Promise<boolean>;
  update: (id: string, updatedFlashcard: Flashcard) => Promise<boolean>;
  deleteById: (id: string) => Promise<boolean>;
};

export function createFlashcardRouter(service: Service) {
  const router = Router();

  router.get("/", async (req, res) => {
    res.json(await service.getAll());
  });

  router.get("/:id", async (req, res) => {
    const flaschard = await service.getById(req.params.id);
    if (flaschard) res.json(flaschard);
    else res.sendStatus(404);
  });

  router.post("/", async (req, res) => {
    await service.create(req.body);
    res.sendStatus(201);
  });

  router.patch("/:id", async (req, res) => {
    if (await service.update(req.params.id, req.body)) res.sendStatus(204);
    else res.sendStatus(404);
  });

  router.delete("/:id", async (req, res) => {
    if (await service.deleteById(req.params.id)) res.sendStatus(204);
    else res.sendStatus(404);
  });

  return router;
}
