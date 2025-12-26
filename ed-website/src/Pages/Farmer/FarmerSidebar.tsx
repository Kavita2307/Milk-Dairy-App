import { NavLink } from "react-router-dom";

export default function FarmerSidebar() {
  return (
    <div className="farmer-sidebar">
      <div className="menu-icon">☰</div>

      <NavLink to="/farmer/herd" className="menu-item">
        Herd Info
      </NavLink>

      <NavLink to="/farmer/milking-group" className="menu-item">
        Milking Group
      </NavLink>

      <NavLink to="/farmer/non-milking-group" className="menu-item">
        Non Milking Group
      </NavLink>

      <NavLink to="/farmer/ingredient-store" className="menu-item">
        Ingredient Store
      </NavLink>

      <NavLink to="/farmer/reports" className="menu-item">
        Reports
      </NavLink>
    </div>
  );
}
