import { NavLink } from "react-router-dom";

export default function FarmerSidebar() {
  return (
    <div className="farmer-sidebar">
      <div className="menu-icon">☰</div>

      <NavLink to="/farmer/herd" className="menu-item">
        Herd Info
      </NavLink>

      <NavLink to="/farmer/ration" className="menu-item">
        Ration
      </NavLink>

      <NavLink to="/farmer/milk" className="menu-item">
        Milk Production{" "}
      </NavLink>

      <NavLink to="/farmer/leftover" className="menu-item">
        Leftover
      </NavLink>

      <NavLink to="/farmer/ingredient-store" className="menu-item">
        Ingredient Store
      </NavLink>

      <NavLink to="/farmer/reports" className="menu-item">
        Reports
      </NavLink>

      <NavLink to="/farmer/display" className="menu-item">
        Display
      </NavLink>
    </div>
  );
}
