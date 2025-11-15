import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "../api/client";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const resetPasswordSchema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("id");
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: ResetPasswordForm) {
    if (!token || !userId) {
      setMessage("Invalid reset link");
      return;
    }

    setIsLoading(true);
    setMessage("");
    try {
      const { data } = await api.post("/auth/reset", {
        token,
        userId,
        newPassword: values.newPassword,
      });
      setMessage(data.message || "Password reset successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  if (!token || !userId) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>Invalid Reset Link</h2>
          <p>This password reset link is invalid or has expired.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Reset Password</h2>
        <p className="auth-description">Enter your new password below.</p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="form-group">
            <input
              {...register("newPassword")}
              type="password"
              placeholder="New Password"
              className="form-input"
            />
            {errors.newPassword && <p className="error-message">{errors.newPassword.message}</p>}
          </div>

          <div className="form-group">
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm Password"
              className="form-input"
            />
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" disabled={isLoading} className="btn btn-primary">
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>

          {message && (
            <p className={message.includes("successful") ? "success-message" : "error-message"}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
