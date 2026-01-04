// import { useNavigate } from "react-router-dom";
// import "../../../styles/herd.css";
// import FarmerSidebar from "../FarmerSidebar";
// import { AuthContext } from "../../../features/auth/authContext";
// import { useContext } from "react";

// export default function HerdInfo() {
//   const navigate = useNavigate();
//   const { user, logout } = useContext(AuthContext);

//   console.log(user.id);
//   console.log(user.role);

//   return (
//     <div className="farmer-container">
//       <FarmerSidebar />

//       <div className="herd-container">
//         <h2>Herd Information</h2>

//         <div className="card-grid">
//           <div className="herd-card" onClick={() => navigate("milking")}>
//             <h3>Milking Group</h3>
//             <p>Add milking animals</p>
//           </div>

//           <div className="card-grid">
//             <div className="herd-card" onClick={() => navigate("non-milking")}>
//               <h3>Non Milking Group</h3>
//               <p>Add non-milking animals</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useNavigate } from "react-router-dom";
import "@/styles/herd.css";
import FarmerSidebar from "../FarmerSidebar";

export default function HerdInfo() {
  const navigate = useNavigate();

  return (
    <div className="farmer-container">
      <FarmerSidebar />

      <div className="herd-container">
        {/* HEADER */}
        <div className="herd-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>

          <div>
            <h2 className="herd-header">Herd Information</h2>
            <p className="subtitle">
              Manage milking and non-milking animal groups
            </p>
          </div>
        </div>

        {/* CARDS */}
        <div className="herd-card-grid">
          <div
            className="herd-card milking"
            onClick={() => navigate("milking")}
          >
            <div className="card-icon">🥛</div>
            <h3>Milking Group</h3>
            <p>Add & manage milking animals</p>
          </div>

          <div
            className="herd-card non-milking"
            onClick={() => navigate("non-milking")}
          >
            <div className="card-icon">🐄</div>
            <h3>Non-Milking Group</h3>
            <p>Add & manage non-milking animals</p>
          </div>
        </div>
      </div>
    </div>
  );
}
