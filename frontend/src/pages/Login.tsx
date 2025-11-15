import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../api/schemas";
import api from "../api/client";
import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const { register, handleSubmit } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });
  const setAuth = useAuthStore(s => s.setAuth);
  const navigate = useNavigate();

  async function onSubmit(values: LoginForm) {
    const { data } = await api.post("/auth/login", values);
    setAuth(data.token, data.user);
    navigate("/");
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
            />
          </div>
          <div className="form-group">
            <input
              {...register("password")}
              placeholder="Password"
              type="password"
              className="form-input"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
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
