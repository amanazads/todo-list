import { Router } from "express";
import { createTodo, listTodos, updateTodo, deleteTodo } from "../controllers/todoController";
import { requireAuth } from "../middleware/authMiddleware";

const router = Router();
router.use(requireAuth);
router.post("/", createTodo);
router.get("/", listTodos);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
