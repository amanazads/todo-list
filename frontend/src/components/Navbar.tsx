import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

function Navbar() {
  const { token, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Todo App
        </Link>
        
        <div className="navbar-menu">
          {token ? (
            <>
              <span className="navbar-user">Hello, {user?.name || "User"}</span>
              <Link to="/todos" className="navbar-link">
                My Todos
              </Link>
              <button onClick={handleLogout} className="navbar-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                Login
              </Link>
              <Link to="/signup" className="navbar-link">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
