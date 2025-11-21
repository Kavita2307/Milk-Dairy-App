import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";

export const requireAuth = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer "))
    return res.status(401).json({ error: "Unauthorized" });

  const token = auth.split(" ")[1];
  try {
    const payload = verifyJwt(token);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
