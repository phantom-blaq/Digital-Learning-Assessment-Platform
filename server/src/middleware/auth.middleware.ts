import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../env";
import { log } from "node:console";

export interface AuthTokenPayload {
  userId: string;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: AuthTokenPayload;
  }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  console.log("auth header", req.headers.authorization);

  if (!authHeader)
    return res.status(401).json({ message: "Authorization header missing" });

  if (!authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Invalid authorization format" });

  const token = authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    console.log("decoded", decoded);

    if (typeof decoded !== "object" || !("userId" in decoded))
      return res.status(401).json({ message: "Invalid token payload" });

    req.user = decoded as AuthTokenPayload;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
