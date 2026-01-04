import { useNavigate } from "react-router-dom";
import "@/styles/groupList.css";

const GROUPS = [
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

export default function FarmerLeftoverGroup() {
  const navigate = useNavigate();

  return (
    <div className="group-page">
      <h2>Leftover – Select Group</h2>

      <div className="group-list">
        {GROUPS.map((g) => (
          <div
            key={g.id}
            className="group-card"
            onClick={() =>
              navigate(`/farmer/leftover/${g.id}`, {
                state: {
                  groupTitle: `Group ${g.id} – ${g.title}`,
                },
              })
            }
          >
            <div className="icon-box" style={{ backgroundColor: g.bg }}>
              🐄
            </div>

            <div className="group-text">
              <div className="group-title">
                Group {g.id} – {g.title}
              </div>
              <div className="group-info">{g.info}</div>
            </div>

            <div className="chevron">›</div>
          </div>
        ))}
      </div>
    </div>
  );
}
