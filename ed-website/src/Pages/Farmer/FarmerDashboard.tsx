import { Outlet } from "react-router-dom";
import FarmerSidebar from "./FarmerSidebar";
import "../../styles/farmer.css";

export default function FarmerLayout() {
  return (
    <div className="farmer-container">
      {/* LEFT MENU */}
      <FarmerSidebar />

      {/* RIGHT CONTENT */}
      <div className="farmer-content">
        <Outlet />
      </div>
    </div>
  );
}
