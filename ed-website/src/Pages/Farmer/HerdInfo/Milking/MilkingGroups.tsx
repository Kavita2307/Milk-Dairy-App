// import { useNavigate } from "react-router-dom";
// import "../../../../styles/nonMilkingGroup.css";

// const groups = [
//   { id: 1, name: "High Yielder", bg: "#DCFCE7" },
//   { id: 2, name: "Medium Yielder", bg: "#E0F2FE" },
//   { id: 3, name: "Low Yielder", bg: "#FEF3C7" },
// ];

// export default function MilkingGroups() {
//   const navigate = useNavigate();

//   return (
//     <div>
//       <h2>Milking Groups</h2>

//       <div className="group-grid">
//         {groups.map((g) => (
//           <div
//             key={g.id}
//             className="group-card"
//             style={{ backgroundColor: g.bg }}
//             onClick={() =>
//               navigate(`/farmer/milking/${g.id}`, {
//                 state: { groupTitle: g.name },
//               })
//             }
//           >
//             <h3>Group {g.id}</h3>
//             <p>{g.name}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { useNavigate } from "react-router-dom";
import "@/styles/nonMilkingGroup.css";
import FarmerSidebar from "../../FarmerSidebar";

const groups = [
  { id: 1, name: "High Yielder", color: "green" },
  { id: 2, name: "Medium Yielder", color: "blue" },
  { id: 3, name: "Low Yielder", color: "yellow" },
];

export default function MilkingGroups() {
  const navigate = useNavigate();

  return (
    <div className="farmer-container">
      {/* SIDEBAR */}
      <FarmerSidebar />

      {/* CONTENT */}
      <div className="farmer-content group-container">
        <div className="herd-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>

          <div>
            <h2 className="page-title">Milking Groups</h2>
            <p className="subtitle">Select a group to manage milking animals</p>
          </div>
        </div>

        <div className="group-grid">
          {groups.map((g) => (
            <div
              key={g.id}
              className={`group-card ${g.color}`}
              onClick={() =>
                navigate(`/farmer/milking/${g.id}`, {
                  state: { groupTitle: g.name },
                })
              }
            >
              <div className="group-icon">🥛</div>
              <h3>{g.name}</h3>
              <p>Group {g.id}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
