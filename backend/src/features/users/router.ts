import { Router } from "express";
import { Service } from "./service";

export function createUserRouter(service: Service) {
  const router = Router();

  router.post("/register", async (req, res) => {
    (await service.register(req.body))
      ? res.sendStatus(201)
      : res.sendStatus(409);
  });

  router.post("/login", async (req, res) => {
    const accessToken = await service.login(req.body);
    accessToken ? res.status(200).json({ accessToken }) : res.sendStatus(404);
  });

  return router;
}
