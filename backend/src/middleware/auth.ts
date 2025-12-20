import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export interface AuthRequest extends Request {
  user?: { id: number; email?: string };
}
export const requireAuth = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: "No token" });

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    req.user = decoded; // { userId, email }

    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};
