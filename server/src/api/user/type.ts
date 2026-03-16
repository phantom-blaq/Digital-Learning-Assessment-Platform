import { email, z } from "zod";

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type loginBodyType = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export type signupBodyType = z.infer<typeof signupSchema>;
