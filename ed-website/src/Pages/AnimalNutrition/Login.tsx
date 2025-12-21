import { useAuth } from "../../features/auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

  const loginAs = (role: "farmer" | "official") => {
    auth.login(role);
    navigate(role === "farmer" ? "/farmer/dashboard" : "/official/dashboard");
  };

  return (
    <div>
      <h2>Animal Nutrition Login</h2>
      <button onClick={() => loginAs("farmer")}>Farmer Login</button>
      <button onClick={() => loginAs("official")}>Official Login</button>
    </div>
  );
}
