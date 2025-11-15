import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "../api/client";
import { useState } from "react";
import { Link } from "react-router-dom";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: ForgotPasswordForm) {
    setIsLoading(true);
    setMessage("");
    try {
      const { data } = await api.post("/auth/forgot", values);
      setMessage(data.message || "Password reset link sent to your email!");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Forgot Password</h2>
        <p className="auth-description">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="form-group">
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="form-input"
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          <button type="submit" disabled={isLoading} className="btn btn-primary">
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>

          {message && <p className="success-message">{message}</p>}
        </form>

        <div className="auth-footer">
          <Link to="/login" className="link">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
