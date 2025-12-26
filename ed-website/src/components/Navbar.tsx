import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/logo.jpeg";
import { useContext } from "react";
import { AuthContext } from "../features/auth/authContext";

export default function Navbar() {
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);

  return (
    <>
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

        {/* <button onClick={() => setOpen(true)}>Login / Sign Up</button> */}

        {/* {open && <LoginModal onClose={() => setOpen(false)} />} */}
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={() => navigate("/login")}>Login / Sign Up</button>
        )}
      </header>
    </>
  );
}
