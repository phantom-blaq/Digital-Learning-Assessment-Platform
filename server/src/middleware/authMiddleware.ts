import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({
      message: "Access denied. No token provided.",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Invalid token format.",
    });
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key");

    req.user = decoded;

    next();
  } catch (err) {
    console.error("Error in token:", err);

    return res.status(400).json({
      message: "Invalid token",
    });
  }
};

export default authMiddleware;
