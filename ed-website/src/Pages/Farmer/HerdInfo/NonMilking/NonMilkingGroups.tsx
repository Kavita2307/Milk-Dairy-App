// import { useNavigate } from "react-router-dom";
// import "../../../styles/nonMilkingGroup.css";
// import FarmerSidebar from "../../FarmerSidebar";

// const nonMilkingGroups = [
//   {
//     id: 4,
//     title: "Starter Calf",
//     extrainfo: "0–2 months",
//     bg: "#DCFCE7",
//   },
//   {
//     id: 5,
//     title: "Starter Calf",
//     extrainfo: "3–6 months",
//     bg: "#DCFCE7",
//   },
//   {
//     id: 6,
//     title: "Grower Calf",
//     extrainfo: "6–12 months",
//     bg: "#E0F2FE",
//   },
//   {
//     id: 7,
//     title: "Heifer",
//     extrainfo: "12–24 months",
//     bg: "#FEF3C7",
//   },
//   {
//     id: 8,
//     title: "Dry Cow",
//     extrainfo: "Far off (−60 to −21 days)",
//     bg: "#FEE2E2",
//   },
//   {
//     id: 9,
//     title: "Dry Cow",
//     extrainfo: "Close up (−21 to 0 days)",
//     bg: "#FEE2E2",
//   },
// ];

// export default function NonMilkingGroup() {
//   const navigate = useNavigate();

//   return (
//     <div className="farmer-container">
//       <FarmerSidebar />
//       <div>
//         <h2>Non Milking Groups</h2>
//         <p className="subtitle">Manage calves, heifers, and dry cows</p>

//         <div className="group-grid">
//           {nonMilkingGroups.map((group) => {
//             return (
//               <div
//                 key={group.id}
//                 className="group-card"
//                 style={{ backgroundColor: group.bg }}
//                 onClick={() =>
//                   navigate(`/farmer/nonmilkinganimals/${group.id}`)
//                 }
//               >
//                 <h3>{group.title}</h3>
//                 <p>{group.extrainfo}</p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useNavigate } from "react-router-dom";
import "../../../../styles/nonMilkingGroup.css";

const nonMilkingGroups = [
  { id: 4, title: "Starter Calf", extrainfo: "0–2 months", bg: "#DCFCE7" },
  { id: 5, title: "Starter Calf", extrainfo: "3–6 months", bg: "#DCFCE7" },
  { id: 6, title: "Grower Calf", extrainfo: "6–12 months", bg: "#E0F2FE" },
  { id: 7, title: "Heifer", extrainfo: "12–24 months", bg: "#FEF3C7" },
  { id: 8, title: "Dry Cow", extrainfo: "Far off", bg: "#FEE2E2" },
  { id: 9, title: "Dry Cow", extrainfo: "Close up", bg: "#FEE2E2" },
];

export default function NonMilkingGroups() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Non Milking Groups</h2>

      <div className="group-grid">
        {nonMilkingGroups.map((g) => (
          <div
            key={g.id}
            className="group-card"
            style={{ backgroundColor: g.bg }}
            onClick={() =>
              navigate(`/farmer/non-milking/${g.id}`, {
                state: { groupTitle: g.title },
              })
            }
          >
            <h3>{g.title}</h3>
            <p>{g.extrainfo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
