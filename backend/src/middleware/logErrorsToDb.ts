import { Request, Response, NextFunction } from "express";
import { Log } from "../models/Log";

export function logErrorsToDb(err: any, req: Request, res: Response, next: NextFunction) {
  // Save to logs collection (non-blocking)
  try {
    Log.create({ message: err.message, stack: err.stack, route: req.originalUrl });
  } catch (e) {
    console.error("Failed to log to DB", e);
  }
  next(err);
}
