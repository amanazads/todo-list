import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const todoSchema = z.object({
  _id: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
  createdAt: z.string().optional()
});
export const todosSchema = z.array(todoSchema);
