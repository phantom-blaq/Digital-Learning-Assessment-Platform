import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";

export async function registerUser(
  email: string,
  name: string,
  password: string,
) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const Token = generateToken(user.id);
  return { user, Token };
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }
  const Token = generateToken(user.id);
  return { user, Token };
}

function generateToken(userId: string) {
  return jwt.sign({ id: userId }, "your-secret-key", { expiresIn: "24h" });
}
