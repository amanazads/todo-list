import { Request, Response } from "express";
import { User } from "../models/User";
import { generateJwt } from "../utils/generateToken";
import crypto from "crypto";
import { ResetToken } from "../models/ResetToken";
import { createTransporter, sendMail } from "../utils/mailer";

export async function signup(req: Request, res: Response) {
  try {
    const { email, password, name } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already used" });
    
    const user = await User.create({ email, password, name });
    const token = generateJwt(
      { id: user._id },
      process.env.JWT_SECRET!,
      process.env.JWT_EXPIRES_IN
    );
    res.json({
      token,
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });
    
    const token = generateJwt(
      { id: user._id },
      process.env.JWT_SECRET!,
      process.env.JWT_EXPIRES_IN
    );
    res.json({
      token,
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
}

export async function forgotPassword(req: Request, res: Response) {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(200)
      .json({ message: "If the email exists, we sent reset link" }); // don't reveal
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour
  await ResetToken.create({ user: user._id, token, expiresAt });

  const transporter = createTransporter({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  });

  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}&id=${user._id}`;
  const html = `<p>Click to reset: <a href="${resetLink}">${resetLink}</a></p>`;
  await sendMail(transporter, user.email, "Password reset", html);
  return res.json({ message: "If the email exists, we sent reset link" });
}

export async function resetPassword(req: Request, res: Response) {
  const { token, userId, newPassword } = req.body;
  const reset = await ResetToken.findOne({ user: userId, token });
  if (!reset || reset.expiresAt < new Date())
    return res.status(400).json({ message: "Invalid or expired token" });
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  // @ts-ignore
  user.password = newPassword;
  await user.save();
  await ResetToken.deleteMany({ user: userId });
  res.json({ message: "Password updated" });
}
