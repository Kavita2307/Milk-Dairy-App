import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { apiFetch } from "@/app/fetcher";
import { AuthContext } from "@/features/auth/authContext";
import { readLoadCell } from "@/app/loadCell";

export default function MilkProductionPage() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  const { animalNumber, shift } = location.state;

  const [milkLit, setMilkLit] = useState("0");
  const [useLoadCell, setUseLoadCell] = useState(false);
  const [saving, setSaving] = useState(false);

  /* LOAD CELL POLLING */
  useEffect(() => {
    if (!useLoadCell) return;

    const interval = setInterval(async () => {
      try {
        const data = await readLoadCell();
        if (data.stable) {
          setMilkLit(String(data.weight.toFixed(2)));
        }
      } catch (err) {
        console.error("Load cell error", err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [useLoadCell]);

  const saveMilk = async () => {
    const value = Number(milkLit);
    if (value <= 0) {
      alert("Milk must be greater than 0");
      return;
    }

    try {
      setSaving(true);
      await apiFetch("/api/milk", {
        method: "POST",
        body: JSON.stringify({
          groupId: Number(groupId),
          animalNumber,
          shift,
          milkLit: value,
          userId: user?.id,
        }),
      });

      alert("Milk saved successfully");
      navigate(-1);
    } catch {
      alert("Failed to save milk");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page">
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2 className="page-title">
        {shift} – Animal #{animalNumber}
      </h2>

      <button
        className="switch-btn"
        onClick={() => {
          setUseLoadCell(!useLoadCell);
          setMilkLit("0");
        }}
      >
        {useLoadCell ? "Use Manual Entry" : "Use Load Cell"}
      </button>

      {!useLoadCell ? (
        <input
          className="milk-input"
          value={milkLit}
          onChange={(e) => setMilkLit(e.target.value)}
          placeholder="Enter milk (litres)"
        />
      ) : (
        <div className="load-box">{milkLit}</div>
      )}

      <button className="save-btn" onClick={saveMilk} disabled={saving}>
        {saving ? "Saving..." : "Save Milk"}
      </button>
    </div>
  );
}
