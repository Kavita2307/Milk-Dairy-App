import { useNavigate } from "react-router-dom";

const groups = [
  { id: 1, name: "High Yielder" },
  { id: 2, name: "Medium Yielder" },
  { id: 3, name: "Low Yielder" },
];

export default function MilkingGroups() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Milking Groups</h2>

      <div className="card-grid">
        {groups.map((g) => (
          <div
            key={g.id}
            className="herd-card"
            onClick={() => navigate(`/farmer/animals/${g.id}`)}
          >
            <h3>Group {g.id}</h3>
            <p>{g.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
