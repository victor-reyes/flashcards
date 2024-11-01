import express from "express";
import { createRouter } from "../flashcards";

export function creatApp() {
  const app = express();

  app.get("/", (_, res) => {
    res.sendStatus(200);
  });

  const flashcardsRouter = createRouter();
  app.use("/api/flashcards", flashcardsRouter);
  return app;
}
