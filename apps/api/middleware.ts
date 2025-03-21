import type{ NextFunction, Request, Response } from "express";

export function authMiddleWare(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];

  req.userId = "5";
  next();
}