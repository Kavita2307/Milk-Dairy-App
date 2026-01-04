import { useNavigate } from "react-router-dom";
import "@/styles/milkProduction.css";

const groups = [
  { id: 1, title: "Group 1 (High Yielder)" },
  { id: 2, title: "Group 2 (Medium Yielder)" },
  { id: 3, title: "Group 3 (Low Yielder)" },
];

export default function MilkingGroups() {
  const navigate = useNavigate();

  return (
    <div className="milk-page">
      <h2>Milking Groups</h2>

      {groups.map((g) => (
        <div
          key={g.id}
          className="milk-card"
          onClick={() =>
            navigate(`/farmer/milk/${g.id}/shift`, {
              state: { groupTitle: g.title },
            })
          }
        >
          {g.title}
          <span>›</span>
        </div>
      ))}
    </div>
  );
}
