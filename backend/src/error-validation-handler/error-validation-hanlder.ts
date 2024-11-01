import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export function createErrorRequestHandler() {
  const errorHanlder: ErrorRequestHandler = (err, _, res, next) => {
    if (err instanceof ZodError) {
      res.status(400).json(err.errors);
    } else {
      next(err);
    }
  };

  return errorHanlder;
}
