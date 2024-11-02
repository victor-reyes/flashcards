import { Router } from "express";
import { User } from "./types";

export type Repository = {
  register: (user: User) => Promise<boolean>;
};

export function createUserRouter(repository: Repository) {
  const router = Router();

  router.post("/register", async (req, res) => {
    const user = User.parse(req.body);
    (await repository.register(user))
      ? res.sendStatus(201)
      : res.sendStatus(409);
  });

  return router;
}
