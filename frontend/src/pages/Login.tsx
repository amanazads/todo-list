import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../api/schemas";
import api from "../api/client";
import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useState } from "react";

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });
  const setAuth = useAuthStore(s => s.setAuth);
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: LoginForm) {
    setIsLoading(true);
    setServerError("");
    try {
      const { data } = await api.post("/auth/login", values);
      setAuth(data.token, data.user);
      navigate("/todos");
    } catch (error: any) {
      setServerError(error.response?.data?.message || "Login failed. Please check your credentials.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="form-group">
            <input
              {...register("email")}
              placeholder="Email"
              className="form-input"
              type="email"
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <input
              {...register("password")}
              placeholder="Password"
              type="password"
              className="form-input"
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
          
          {serverError && <p className="error-message">{serverError}</p>}
        </form>
        <div className="auth-footer">
          <Link to="/forgot-password" className="link">
            Forgot password?
          </Link>
          <span className="separator">•</span>
          <Link to="/signup" className="link">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
