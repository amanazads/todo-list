import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1, "Name is required"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const todoSchema = z.object({
  _id: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
  createdAt: z.string().optional()
});
export const todosSchema = z.array(todoSchema);
