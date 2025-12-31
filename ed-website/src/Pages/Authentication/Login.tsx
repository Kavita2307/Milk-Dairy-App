// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../features/auth/authContext";
// import { setAuth } from "../../features/auth/auth.utils";
// import "../../styles/auth.css";

// const API = import.meta.env.VITE_API_BASE_URL;

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const navigate = useNavigate();
//   const { setUser } = useContext(AuthContext);

//   const handleLogin = async () => {
//     setError("");

//     try {
//       const res = await fetch(`${API}/api/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok || !data.user || !data.token) {
//         setError(data.message || "Invalid credentials");
//         return;
//       }

//       setAuth(data.token, data.user);
//       setUser(data.user);

//       if (data.user.role === "farmer") {
//         navigate("/farmer/dashboard", { replace: true });
//       } else {
//         navigate("/admin/dashboard", { replace: true });
//       }
//     } catch {
//       setError("Cannot connect to server");
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-card">
//         <button className="close-btn" onClick={() => navigate("/")}>
//           ✕
//         </button>

//         <h2>Welcome Back</h2>
//         <p className="subtitle">Login to ED Ellite Dairymen</p>

//         <input
//           className="auth-input"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           className="auth-input"
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {error && <p className="error">{error}</p>}

//         <button className="primary-btn" onClick={handleLogin}>
//           Login
//         </button>

//         <div className="divider">OR</div>

//         {/* ✅ SIMPLE ROUTE NAVIGATION */}
//         <button className="secondary-btn" onClick={() => navigate("/register")}>
//           Create New Account
//         </button>
//       </div>
//     </div>
//   );
// }
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../features/auth/authContext";
import { setAuth } from "../../features/auth/auth.utils";
import "../../styles/auth.css";

const API = import.meta.env.VITE_API_BASE_URL;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleLogin = async () => {
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }

    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.user || !data.token) {
        setError(data.message || "Invalid credentials");
        return;
      }

      setAuth(data.token, data.user);
      setUser(data.user);

      if (data.user.role === "farmer") {
        navigate("/farmer/dashboard", { replace: true });
      } else {
        navigate("/admin/dashboard", { replace: true });
      }
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

        <h2>Welcome Back</h2>
        <p className="subtitle">Login to ED Ellite Dairymen</p>

        <input
          className="auth-input"
          placeholder="Email or Mobile Number"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button className="primary-btn" onClick={handleLogin}>
          Login
        </button>

        <div className="divider">OR</div>

        <button className="secondary-btn" onClick={() => navigate("/register")}>
          Create New Account
        </button>
      </div>
    </div>
  );
}
