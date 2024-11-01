import { Router } from "express";

export function createRouter() {
  const router = Router();

  router.get("/", (req, res) => {
    res.json([]);
  });

  return router;
}
