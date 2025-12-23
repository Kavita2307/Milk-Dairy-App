import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/logo.jpeg";

export default function Navbar() {
  return (
    <header className="navbar">
      {/* Left: Logo */}
      <div className="navbar__logo">
        <img src={logo} alt="ED Ellite Dairymen" />
      </div>

      {/* Center: Navigation */}
      <nav className="navbar__menu">
        <Link to="/about-us" className="active">
          About Us
        </Link>
        <Link to="/animal-nutrition">Animal Nutrition</Link>
        <Link to="/ed-milk" className="disabled">
          ED Milk
        </Link>
        <Link to="/our-products">Our Products</Link>
        <Link to="/livestock-lore">Livestock Lore</Link>
        <Link to="/contact-us">Contact Us</Link>
      </nav>

      {/* Right: Login / Signup */}
      <div className="navbar__auth">
        <button className="login-btn">Login / Sign Up</button>
      </div>
    </header>
  );
}
