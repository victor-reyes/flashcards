import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export function createErrorRequestHandler() {
  const errorHanlder: ErrorRequestHandler = (err, _, res, next) => {
    if (err instanceof ZodError) {
      res.status(400).json(err.errors);
    } else if (err.name === "ValidationError") {
      res.status(409).send(err.message);
    } else {
      next(err);
    }
  };

  return errorHanlder;
}
