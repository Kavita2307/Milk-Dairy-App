import { Link } from "react-router-dom";
import { colors } from "../theme/colors";

export default function Sidebar() {
  return (
    <aside style={{ background: colors.sidebar, color: "white", width: 240 }}>
      <h2 style={{ padding: 16 }}>ED Website</h2>
      <nav>
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/about-us" className="link">
          About Us
        </Link>
        <Link to="/animal-nutrition/login" className="link">
          Animal Nutrition
        </Link>
        <Link to="/ed-milk" className="link">
          ED Milk
        </Link>
      </nav>
    </aside>
  );
}
