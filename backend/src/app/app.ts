import express from "express";
import { createRepository, createRouter } from "../flashcards";
import { createErrorRequestHandler } from "../error-validation-handler";

export function creatApp() {
  const app = express();

  app.use(express.json());

  app.get("/", (_, res) => {
    res.sendStatus(200);
  });

  const flashcardsRepository = createRepository();
  const flashcardsRouter = createRouter(flashcardsRepository);
  app.use("/api/flashcards", flashcardsRouter);

  const errorRequestHanlder = createErrorRequestHandler();
  app.use(errorRequestHanlder);

  return app;
}
