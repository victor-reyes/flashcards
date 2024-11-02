import express, { Router } from "express";
import { createErrorRequestHandler } from "../error-validation-handler";

export function creatApp(flashcardsRouter: Router, userRouter: Router) {
  const app = express();

  app.use(express.json());

  app.get("/", (_, res) => {
    res.sendStatus(200);
  });

  app.use("/api/flashcards", flashcardsRouter);
  app.use("/api/users", userRouter)

  const errorRequestHanlder = createErrorRequestHandler();
  app.use(errorRequestHanlder);

  return app;
}
