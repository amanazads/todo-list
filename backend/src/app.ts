import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todos";
import { logErrorsToDb } from "./middleware/logErrorsToDb";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(cors({ 
  origin: process.env.FRONTEND_URL || true,
  credentials: true 
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.use(logErrorsToDb);
app.use(errorHandler);

export default app;
