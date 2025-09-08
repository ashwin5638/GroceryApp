import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
   
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const loginForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrorMessage("");

    try {
      // Fixed: Changed URL from /Users/login to /login to match backend
      const response = await fetch("https://groceryapp-backend-3mgw.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Fixed: Changed field names to match backend expectations
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (data.success) {
        localStorage.setItem("isLoggedIn", "true");
        // Fixed: Changed from data.userId to data.user.id to match backend response
        localStorage.setItem("userId", data.user.id);
        navigate("/"); // go to home page
      } else {
        setErrorMessage(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Error:", err);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h2>Welcome Back</h2>
        <p className="login-subtitle">Please sign in to your account</p>

        <form onSubmit={loginForm} className="login-form">
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" name="remember" />
              <span className="checkmark"></span>
              Remember me
            </label>
            <a href="/forgot-password" className="forgot-link">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="signup-link">
            Don&apos;t have an account?{" "}
            <a href="/register">Sign up here</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
