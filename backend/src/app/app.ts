import express from "express";

export function creatApp() {
  const app = express();

  app.get("/", (_, res) => {
    res.sendStatus(200);
  });

  return app;
}
