import { Request, Response } from "express";
import { registerUser, loginUser } from "./service";

export async function register(req: Request, res: Response) {
  const { email, name, password } = req.body;
  try {
    const registeredUser = await registerUser(email, name, password);
    res.status(200).send(registeredUser);
  } catch (error: any) {
    res
      .status(400)
      .send({ message: "Registration failed", error: error.message });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const userLoggedIn = await loginUser(email, password);
    res.status(200).send(userLoggedIn);
  } catch (error: any) {
    res.status(400).send({ message: "Login failed", error: error.message });
  }
}
