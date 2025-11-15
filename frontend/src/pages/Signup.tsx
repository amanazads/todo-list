import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../api/schemas";
import { z } from "zod";
import api from "../api/client";
import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

type SignupForm = z.infer<typeof signupSchema>;

export default function Signup() {
  const { register, handleSubmit, formState:{ errors } } = useForm<SignupForm>({ resolver: zodResolver(signupSchema) });
  const setAuth = useAuthStore(s => s.setAuth);
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: SignupForm) {
    setIsLoading(true);
    setServerError("");
    try {
      const { data } = await api.post("/auth/signup", values);
      setAuth(data.token, data.user);
      navigate("/todos");
    } catch (error: any) {
      setServerError(error.response?.data?.message || "Signup failed. Please try again.");
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="form-group">
            <input {...register("name")} placeholder="Name" className="form-input" />
            {errors.name && <p className="error-message">{errors.name.message}</p>}
          </div>
          <div className="form-group">
            <input {...register("email")} placeholder="Email" className="form-input" />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="form-input"
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? "Signing up..." : "Sign up"}
          </button>
          
          {serverError && <p className="error-message">{serverError}</p>}
        </form>
        <div className="auth-footer">
          <span>Already have an account?</span>
          <Link to="/login" className="link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
