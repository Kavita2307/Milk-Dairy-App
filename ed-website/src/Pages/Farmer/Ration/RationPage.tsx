import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "@/styles/ration.css";
import { apiFetch } from "@/app/fetcher";
import FarmerSidebar from "../FarmerSidebar";

export default function RationPage() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const groupTitle = location.state?.groupTitle || "Ration";

  const [ration, setRation] = useState<any>(null);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [kg, setKg] = useState("");

  const loadData = async () => {
    try {
      const r = await apiFetch(`/api/ration/${groupId}`).then((r) => r.json());
      const h = await apiFetch(`/api/ration/history/${groupId}`).then((r) =>
        r.json()
      );

      setRation(r?.ration || null);
      setIngredients(r?.ingredients || []);
      setHistory(h?.history || []);
    } catch {
      setIngredients([]);
      setHistory([]);
    }
  };
  useEffect(() => {
    loadData();
  }, [groupId]);
  if (!ration) {
    return <p className="loading">Loading ration...</p>;
  }

  return (
    <div className="farmer-container">
      {/* LEFT SIDEBAR */}
      <FarmerSidebar />
      <div className="page">
        {/* HEADER */}
        <div className="page-header">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <h2 className="page-title">{groupTitle}</h2>
        </div>

        {/* FEED SUMMARY */}
        <div className="card">
          <h3>Feed Summary</h3>
          <Info label="Feed Name" value={ration.name} />
          <Info label="Animals" value={ration.no} />
          <Info label="Kg / Animal" value={`${ration.kg} kg`} />
          <Info label="Total Feed" value={`${ration.total} kg`} />
          <Info label="Ration Size" value={`${ration.rationSize}%`} />
          <Info label="Days" value={`${ration.days} days`} />
        </div>

        {/* HISTORY */}
        <div className="card">
          <h3>Last 7 Days Feed History</h3>
          {history.length ? (
            history.map((h: any, i: number) => (
              <div className="row-between" key={i}>
                <span>{new Date(h.createdAt).toDateString()}</span>
                <strong>{h.total} kg</strong>
              </div>
            ))
          ) : (
            <p className="muted">No history available</p>
          )}
        </div>

        {/* INGREDIENTS */}
        <div className="card">
          <h3>Ingredients</h3>

          {ingredients.map((ing: any) => {
            const dm = ((ing.quantity * ing.dm) / 100).toFixed(2);

            return (
              <div className="ingredient-row" key={ing.consumptionId}>
                <div>
                  <strong>{ing.name}</strong>
                  <p>Per Animal: {ing.quantity} kg</p>
                  <p>Dry Matter: {dm} kg</p>
                </div>

                <button
                  className="edit-btn"
                  onClick={() => {
                    setEditing(ing);
                    setKg(String(ing.quantity));
                  }}
                >
                  Edit
                </button>
              </div>
            );
          })}
        </div>

        {/* MIX PRECISION */}
        <div className="card">
          <h3>Mix Precision</h3>
          <button
            className="primary-btn"
            onClick={() =>
              navigate(`/farmer/ration/${groupId}/mix`, {
                state: { rationId: ration.id },
              })
            }
          >
            Start Mixing
          </button>
        </div>

        {/* EDIT MODAL */}
        {editing && (
          <div className="modal">
            <div className="modal-card">
              <h3>{editing.name}</h3>

              <input
                value={kg}
                onChange={(e) => setKg(e.target.value)}
                placeholder="Kg per animal"
              />

              <p>
                Dry Matter: {((Number(kg || 0) * editing.dm) / 100).toFixed(2)}{" "}
                kg
              </p>

              <div className="actions">
                <button onClick={() => setEditing(null)}>Cancel</button>
                <button
                  className="primary-btn"
                  onClick={async () => {
                    await apiFetch(
                      `/api/ration/ingredient/${editing.consumptionId}`,
                      {
                        method: "PUT",
                        body: JSON.stringify({ kg: Number(kg) }),
                      }
                    );
                    setEditing(null);
                    loadData();
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const Info = ({ label, value }: any) => (
  <div className="row-between">
    <span>{label}</span>
    <strong>{value}</strong>
  </div>
);
