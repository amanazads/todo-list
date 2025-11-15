import { Request, Response } from "express";
import { Todo } from "../models/Todo";

export async function createTodo(req: any, res: Response) {
  const { title, description } = req.body;
  const todo = await Todo.create({ title, description, user: req.user._id });
  res.json(todo);
}

export async function listTodos(req: any, res: Response) {
  const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(todos);
}

export async function updateTodo(req: any, res: Response) {
  const { id } = req.params;
  const update = await Todo.findOneAndUpdate({ _id: id, user: req.user._id }, req.body, { new: true });
  if (!update) return res.status(404).json({ message: "Not found" });
  res.json(update);
}

export async function deleteTodo(req: any, res: Response) {
  const { id } = req.params;
  await Todo.findOneAndDelete({ _id: id, user: req.user._id });
  res.json({ message: "Deleted" });
}
