import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { ConflictError } from "../features/users/service";

export function createErrorRequestHandler() {
  const errorHanlder: ErrorRequestHandler = (err, _, res, next) => {
    if (err instanceof ZodError) {
      res.status(400).json(err.errors);
    } else if (err instanceof ConflictError) {
      res.status(409).send(err.message);
    } else {
      next(err);
    }
  };

  return errorHanlder;
}
