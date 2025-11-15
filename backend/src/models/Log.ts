import mongoose, { Document, Schema } from "mongoose";

export interface ILog extends Document {
  message: string;
  stack?: string;
  route?: string;
  createdAt: Date;
}

const LogSchema = new Schema<ILog>({
  message: String,
  stack: String,
  route: String,
}, { timestamps: true });

export const Log = mongoose.model<ILog>("Log", LogSchema);
