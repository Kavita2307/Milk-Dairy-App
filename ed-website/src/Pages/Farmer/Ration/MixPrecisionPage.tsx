import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "@/styles/mixPrecision.css";
import { apiFetch } from "@/app/fetcher";

export default function MixPrecisionPage() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const rationId = location.state?.rationId;

  const [ingredients, setIngredients] = useState<any[]>([]);
  const [inputs, setInputs] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMixData();
  }, []);

  const loadMixData = async () => {
    try {
      const res = await apiFetch(`/api/ration/mix/${rationId}`);
      const data = await res.json();
      setIngredients(data || []);
    } catch {
      alert("Failed to load mix data");
    } finally {
      setLoading(false);
    }
  };

  const totalDiff = ingredients.reduce((sum, i) => {
    const entered = Number(inputs[i.id] || 0);
    return sum + (entered - i.total);
  }, 0);

  const completeMixing = async () => {
    try {
      await apiFetch(`/api/ration/mix/complete`, {
        method: "POST",
        body: JSON.stringify({
          rationId,
          data: ingredients.map((i) => ({
            id: i.id,
            actual: Number(inputs[i.id] || 0),
          })),
        }),
      });

      navigate(`/farmer/ration/${groupId}`);
    } catch {
      alert("Failed to complete mixing");
    }
  };

  if (loading) return <p className="loading">Loading mix precision...</p>;

  return (
    <div className="page">
      {/* HEADER */}
      <div className="page-header">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h2 className="page-title">Mix Precision</h2>
      </div>

      {/* INGREDIENTS */}
      <div className="card">
        <h3>Mix Order</h3>

        {ingredients.map((i) => {
          const entered = Number(inputs[i.id] || 0);
          const diff = entered - i.total;

          return (
            <div key={i.id} className="mix-row">
              <div className="mix-info">
                <strong>{i.name}</strong>
                <p>Target: {i.total} kg</p>
              </div>

              <input
                type="number"
                placeholder="Actual kg"
                value={inputs[i.id] || ""}
                onChange={(e) =>
                  setInputs({ ...inputs, [i.id]: e.target.value })
                }
              />

              <span
                className={`diff ${
                  diff === 0 ? "ok" : diff > 0 ? "high" : "low"
                }`}
              >
                {diff > 0 ? `+${diff}` : diff} kg
              </span>
            </div>
          );
        })}
      </div>

      {/* SUMMARY */}
      <div className="card summary">
        <h3>Total Difference</h3>
        <p className={totalDiff === 0 ? "ok" : "warn"}>
          {totalDiff > 0 ? `+${totalDiff}` : totalDiff} kg
        </p>

        <button className="primary-btn" onClick={completeMixing}>
          Complete Mixing
        </button>
      </div>
    </div>
  );
}
