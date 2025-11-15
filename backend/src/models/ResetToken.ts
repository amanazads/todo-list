import mongoose, { Document, Schema } from "mongoose";

export interface IResetToken extends Document {
  user: mongoose.Types.ObjectId;
  token: string;
  expiresAt: Date;
}

const ResetTokenSchema = new Schema<IResetToken>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

export const ResetToken = mongoose.model<IResetToken>("ResetToken", ResetTokenSchema);
