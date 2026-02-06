// src/controllers/userController.ts
import { Request, Response } from "express";
import { userSchema, User } from "../models/userModel";

export const createUser = (req: Request, res: Response) => {
  try {
    const user: User = userSchema.parse(req.body);

    res.status(201).json({ message: "User created", user });
  } catch (error: any) {
    res.status(400).json({ errors: error.errors });
  }
};
