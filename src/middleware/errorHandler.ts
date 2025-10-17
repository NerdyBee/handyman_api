import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);
  const status = err.statusCode || 500;
  const message = err.message || "Server Error";
  res.status(status).json({ message });
}
