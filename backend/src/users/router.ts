import { Router } from "express";
import { User } from "./types";

export type Repository = {
  register: (user: User) => Promise<boolean>;
  login: (user: User) => Promise<string | undefined>;
};

export function createUserRouter(repository: Repository) {
  const router = Router();

  router.post("/register", async (req, res) => {
    const user = User.parse(req.body);
    (await repository.register(user))
      ? res.sendStatus(201)
      : res.sendStatus(409);
  });

  router.post("/login", async (req, res) => {
    const user = User.parse(req.body);
    const accessToken = await repository.login(user);
    accessToken ? res.status(200).json({ accessToken }) : res.sendStatus(404);
  });

  return router;
}
