import express from "express";
import { createRepository, createRouter } from "../flashcards";

export function creatApp() {
  const app = express();

  app.get("/", (_, res) => {
    res.sendStatus(200);
  });

  const flashcardsRepository = createRepository()
  const flashcardsRouter = createRouter(flashcardsRepository);
  app.use("/api/flashcards", flashcardsRouter);
  return app;
}
