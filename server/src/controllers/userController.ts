import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signupSchema, loginSchema } from "../schemas/auth.schema";
import { userModel, IUserDocument } from "../models/userModel";
import { env } from "../env";

export const signup = async (req: Request, res: Response) => {
  try {
    const body = signupSchema.parse(req.body);

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user: IUserDocument = await userModel.create({
      ...body,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: user._id.toString() }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    });

    res.status(201).json({ user, token });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const body = loginSchema.parse(req.body);

    const user = await userModel.findOne({ email: body.email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isValid = await bcrypt.compare(body.password, user.password);
    if (!isValid)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id.toString() }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    });

    res.json({ user, token });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
