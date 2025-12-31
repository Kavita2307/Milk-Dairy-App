// import { useNavigate } from "react-router-dom";
// import FarmerSidebar from "../../FarmerSidebar";

// const groups = [
//   { id: 1, name: "High Yielder" },
//   { id: 2, name: "Medium Yielder" },
//   { id: 3, name: "Low Yielder" },
// ];

// export default function MilkingGroups() {
//   const navigate = useNavigate();

//   return (
//     <div className="farmer-container">
//       <FarmerSidebar />
//       <div>
//         <h2>Milking Groups</h2>

//         <div className="card-grid">
//           {groups.map((g) => (
//             <div
//               key={g.id}
//               className="herd-card"
//               onClick={() => navigate(`/farmer/milkinganimals/${g.id}`)}
//             >
//               <h3>Group {g.id}</h3>
//               <p>{g.name}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useNavigate } from "react-router-dom";
import "../../../../styles/nonMilkingGroup.css";

const groups = [
  { id: 1, name: "High Yielder", bg: "#DCFCE7" },
  { id: 2, name: "Medium Yielder", bg: "#E0F2FE" },
  { id: 3, name: "Low Yielder", bg: "#FEF3C7" },
];

// export default function MilkingGroups() {
//   const navigate = useNavigate();

//   return (
//     <div>
//       <h2>Milking Groups</h2>

//       <div className="card-grid">
//         {groups.map((g) => (
//           <div
//             key={g.id}
//             className="herd-card"
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
export default function MilkingGroups() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Non Milking Groups</h2>

      <div className="group-grid">
        {groups.map((g) => (
          <div
            key={g.id}
            className="group-card"
            style={{ backgroundColor: g.bg }}
            onClick={() =>
              navigate(`/farmer/milking/${g.id}`, {
                state: { groupTitle: g.name },
              })
            }
          >
            <h3>Group {g.id}</h3>
            <p>{g.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
