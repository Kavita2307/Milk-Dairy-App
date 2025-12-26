import { useNavigate } from "react-router-dom";
import "../../../styles/herd.css";
import FarmerSidebar from "../FarmerSidebar";

export default function HerdInfo() {
  const navigate = useNavigate();

  return (
    <div className="farmer-container">
      <FarmerSidebar />

      <div className="herd-container">
        <h2>Herd Information</h2>

        <div className="card-grid">
          <div className="herd-card" onClick={() => navigate("milking")}>
            <h3>Milking Group</h3>
            <p>View milking animals</p>
          </div>

          <div className="herd-card disabled">
            <h3>Non Milking Group</h3>
            <p>Coming Soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
