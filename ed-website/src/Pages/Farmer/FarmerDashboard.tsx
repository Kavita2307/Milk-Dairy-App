// import { Outlet } from "react-router-dom";
// import FarmerSidebar from "./FarmerSidebar";
// import "@/styles/farmer.css";
// import farmerBanner from "@/assets/farmer-cow-black&white.png";

// export default function FarmerLayout() {

//   return (
//     <div className="farmer-container">
//       {/* LEFT MENU */}
//       <FarmerSidebar />

//       {/* RIGHT CONTENT */}
//       <div className="farmer-content">
//         {/* BANNER IMAGE */}
//         <div
//           className="farmer-banner"
//           style={{
//             backgroundImage: `url(${farmerBanner})`,
//           }}
//         />

//         {/* PAGE CONTENT */}
//         <Outlet />
//       </div>
//     </div>
//   );
// }

import { Outlet, useNavigate } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/features/auth/authContext";
import { apiFetch } from "@/app/fetcher";
import FarmerSidebar from "./FarmerSidebar";
import "@/styles/farmer.css";
import farmerBanner from "@/assets/farmer-cow-black&white.png";

interface FarmerDashboardProps {
  adminView?: boolean;
  farmerId?: number;
}

export default function FarmerDashboard({
  adminView = false,
  farmerId,
}: FarmerDashboardProps) {
  const navigate = useNavigate();
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [farmerName, setFarmerName] = useState<string>("");

  useEffect(() => {
    loadDashboard();
    if (adminView && farmerId) loadFarmerInfo();
  }, []);
  const auth = useContext(AuthContext);
  if (!auth?.user) return null;
  const { user } = auth;

  //If admin is viewing → use farmerIdss Else → use logged-in farmer id

  const activeFarmerId = adminView ? farmerId : user.id;

  const loadFarmerInfo = async () => {
    const res = await apiFetch(`/api/admin/farmer/${farmerId}`);
    const data = await res.json();
    setFarmerName(data.name);
  };

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const data = await apiFetch(
        `/api/farmer/dashboard?farmerId=${activeFarmerId}`
      );
      // const data = await res.json();
      console.log("farmer dashboard data: ", data);
      setSummary(data);
    } catch (err) {
      console.error(err);
      setSummary(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading dashboard...</p>;

  if (!summary) return <p>No data found</p>;

  return (
    <div className="farmer-page-container">
      {" "}
      {/* ADMIN VIEW BANNER */}
      {adminView && (
        <div className="admin-view-banner">
          <div>
            👁 <strong>Viewing Farmer:</strong> {farmerName}
          </div>

          <button
            className="back-btn"
            onClick={() => navigate("/admin/dashboard")}
          >
            ← Back to Admin Dashboard
          </button>
        </div>
      )}
      <h2 className="page-title">
        {adminView ? "Farmer Dashboard (Admin View)" : "My Dashboard"}
      </h2>
      {/* <div className="dashboard-grid">
        <div className="dashboard-card">
          <h4>Total Animals</h4>
          <p>{summary.totalAnimals}</p>
        </div>

        <div className="dashboard-card">
          <h4>Milk Today</h4>
          <p>{summary.todayMilk} L</p>
        </div>

        <div className="dashboard-card">
          <h4>Feed Consumed</h4>
          <p>{summary.feedKg} kg</p>
        </div>

        <div className="dashboard-card">
          <h4>Leftover</h4>
          <p>{summary.leftoverKg} kg</p>
        </div>
      </div> */}
      <div className="farmer-container">
        {/* LEFT MENU */}
        <FarmerSidebar />

        {/* RIGHT CONTENT */}
        <div className="farmer-content">
          {/* BANNER IMAGE */}
          <div
            className="farmer-banner"
            style={{
              backgroundImage: `url(${farmerBanner})`,
            }}
          />
          {/* PAGE CONTENT */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
