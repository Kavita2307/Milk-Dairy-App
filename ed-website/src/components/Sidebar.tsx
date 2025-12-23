import { Link } from "react-router-dom";
import { theme } from "../styles/theme";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: 240,
        background: theme.sidebarBg,
        color: "white",
        minHeight: "100vh",
        padding: 16,
      }}
    >
      <h2>ED Website</h2>
      <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Link to="/">Home</Link>
        <Link to="/about-us">About Us</Link>
        <Link to="/animal-nutrition/login">Animal Nutrition</Link>
        <Link to="/ed-milk">ED Milk</Link>
      </nav>
    </aside>
  );
}
