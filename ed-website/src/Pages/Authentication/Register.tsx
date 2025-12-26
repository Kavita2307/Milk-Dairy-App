import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";

const API = import.meta.env.VITE_API_BASE_URL;

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      setSuccess("Account created successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setError("Cannot connect to server");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <button className="close-btn" onClick={() => navigate("/")}>
          ✕
        </button>

        <h2>Create Account 🚀</h2>
        <p className="subtitle">Join ED Ellite Dairymen</p>

        <input
          className="auth-input"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="auth-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button className="primary-btn" onClick={handleRegister}>
          Register
        </button>

        <p className="link-text" onClick={() => navigate("/login")}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}
