import { useNavigate, useParams, useLocation } from "react-router-dom";

const shifts = ["Morning", "Afternoon", "Evening"];

export default function ProductionShift() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="page">
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2 className="page-title">Select Shift</h2>

      {shifts.map((shift) => (
        <div
          key={shift}
          className="milk-card"
          onClick={() =>
            navigate(`/farmer/milk/${groupId}/animals`, {
              state: { shift },
            })
          }
        >
          {shift}
          <span>›</span>
        </div>
      ))}
    </div>
  );
}
