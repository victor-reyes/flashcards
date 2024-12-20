import { Router } from "express";
import { Service } from "./service";

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
