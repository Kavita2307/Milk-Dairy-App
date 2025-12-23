import { useAuth } from "../../features/auth/auth.hooks";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: "farmer" | "official") => {
    login(role);
    navigate(role === "farmer" ? "/farmer/dashboard" : "/official/dashboard");
  };

  return (
    <div>
      <h2>Animal Nutrition Login</h2>

      <div style={{ marginTop: 24 }}>
        <button onClick={() => handleLogin("farmer")}>Farmer Login</button>
        <button
          onClick={() => handleLogin("official")}
          style={{ marginLeft: 12 }}
        >
          Official Login
        </button>
      </div>
    </div>
  );
}
