import { useNavigate } from "react-router-dom";
import "@/styles/admin.css";

const groups = [
  { id: 1, title: "High Yielder", info: "Milking Group", bg: "#DCFCE7" },
  { id: 2, title: "Medium Yielder", info: "Milking Group", bg: "#E0F2FE" },
  { id: 3, title: "Low Yielder", info: "Milking Group", bg: "#FEF3C7" },
  { id: 4, title: "Starter Calf", info: "0–2 months", bg: "#E0E7FF" },
  { id: 5, title: "Starter Calf", info: "3–6 months", bg: "#E0E7FF" },
  { id: 6, title: "Grower Calf", info: "6–12 months", bg: "#DBEAFE" },
  { id: 7, title: "Heifer", info: "12–24 months", bg: "#FEF9C3" },
  { id: 8, title: "Dry Cow", info: "Far off (−60 to −21 days)", bg: "#FEE2E2" },
  { id: 9, title: "Dry Cow", info: "Close up (−21 to 0 days)", bg: "#FEE2E2" },
];
export default function AdminRationGroups() {
  const navigate = useNavigate();

  return (
    <div className="admin-page">
      <h2>Ration Management</h2>

      <div className="group-grid">
        {groups.map((g) => (
          <div
            key={g.id}
            className="group-card"
            onClick={() => navigate(`/admin/ration/${g.id}`)}
          >
            <div className="group-card-header">
              <h3>{g.title}</h3>
              <p>{g.info}</p>
            </div>
            <div
              className="group-card-footer"
              style={{ backgroundColor: g.bg }}
            >
              Group {g.id}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
