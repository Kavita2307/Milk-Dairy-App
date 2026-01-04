// import { NavLink, useNavigate } from "react-router-dom";
// import "@/styles/Navbar.css";
// import logo from "../assets/logo.jpeg";
// import { useContext } from "react";
// import { AuthContext } from "../features/auth/authContext";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const auth = useContext(AuthContext);

//   if (!auth) return null;
//   const { user, logout } = auth;

//   return (
//     <header className="navbar">
//       {/* LEFT: LOGO */}
//       <div className="navbar__left" onClick={() => navigate("/")}>
//         <img src={logo} alt="ED Ellite Dairymen" className="navbar__logo" />
//       </div>

//       {/* CENTER: MENU */}
//       <nav className="navbar__menu">
//         <NavLink to="/about-us">About Us</NavLink>
//         <NavLink to="/animal-nutrition">Animal Nutrition</NavLink>
//         <NavLink to="/ed-milk">ED Milk</NavLink>
//         <NavLink to="/our-products">Our Products</NavLink>
//         <NavLink to="/livestock-lore">Livestock Lore</NavLink>
//         <NavLink to="/contact-us">Contact Us</NavLink>
//       </nav>

//       {/* RIGHT: AUTH */}
//       <div className="navbar__right">
//         {user ? (
//           <div className="user-menu">
//             <div className="avatar">{user.name?.charAt(0)?.toUpperCase()}</div>

//             <div className="dropdown">
//               <p className="user-name">{user.name}</p>
//               <p className="user-role">{user.role}</p>

//               {user.role === "farmer" && (
//                 <button onClick={() => navigate("/farmer/dashboard")}>
//                   Dashboard
//                 </button>
//               )}

//               <button className="logout-btn" onClick={logout}>
//                 Logout
//               </button>
//             </div>
//           </div>
//         ) : (
//           <button className="login-btn" onClick={() => navigate("/login")}>
//             Login / Sign Up
//           </button>
//         )}
//       </div>
//     </header>
//   );
// }
import { NavLink, useNavigate } from "react-router-dom";
import "@/styles/Navbar.css";
import logo from "@/assets/logo.jpeg";
import { useContext, useState } from "react";
import { AuthContext } from "@/features/auth/authContext";

export default function Navbar() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  if (!auth) return null;
  const { user, logout } = auth;

  return (
    <header className="navbar">
      {/* LEFT: LOGO */}
      <div className="navbar__left" onClick={() => navigate("/")}>
        <img src={logo} alt="ED Ellite Dairymen" className="navbar__logo" />
      </div>

      {/* CENTER: MENU */}
      <nav className="navbar__menu">
        <NavLink to="/about-us">About Us</NavLink>
        <NavLink to="/animal-nutrition">Animal Nutrition</NavLink>
        <NavLink to="/ed-milk">ED Milk</NavLink>
        <NavLink to="/our-products">Our Products</NavLink>
        <NavLink to="/livestock-lore">Livestock Lore</NavLink>
        <NavLink to="/contact-us">Contact Us</NavLink>
      </nav>

      {/* RIGHT: AUTH */}
      <div className="navbar__right">
        {user ? (
          <div className="user-menu">
            {/* AVATAR (CLICK) */}
            <div className="avatar" onClick={() => setOpen((prev) => !prev)}>
              {user.name?.charAt(0)?.toUpperCase()}
            </div>

            {/* DROPDOWN */}
            {open && (
              <div className="dropdown">
                <p className="user-name">{user.name}</p>
                <p className="user-role">{user.role}</p>

                {user.role === "farmer" && (
                  <button
                    onClick={() => {
                      navigate("/farmer/dashboard");
                      setOpen(false);
                    }}
                  >
                    Dashboard
                  </button>
                )}

                <button
                  className="logout-btn"
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login / Sign Up
          </button>
        )}
      </div>
    </header>
  );
}
