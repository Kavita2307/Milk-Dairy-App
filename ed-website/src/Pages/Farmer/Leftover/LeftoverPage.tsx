import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "@/styles/leftover.css";
import { apiFetch } from "@/app/fetcher";
import { readLoadCell } from "@/app/loadCell";
import { AuthContext } from "@/features/auth/authContext";

export default function LeftoverPage() {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const location = useLocation();
  const auth = useContext(AuthContext);

  const [weight, setWeight] = useState("0");
  const [useLoadCell, setUseLoadCell] = useState(false);
  const [saving, setSaving] = useState(false);
  const [stable, setStable] = useState(false);

  /* LOAD CELL POLLING */
  useEffect(() => {
    if (!useLoadCell) return;

    const interval = setInterval(async () => {
      try {
        const data = await readLoadCell();
        setStable(data.stable);

        if (data.stable) {
          setWeight(data.weight.toFixed(2));
        }
      } catch (err) {
        console.error("Load cell error", err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [useLoadCell]);
  if (!auth?.user) return null;
  const { user } = auth;

  const groupTitle = location.state?.groupTitle || "Leftover";
  const saveLeftover = async () => {
    const value = Number(weight);

    if (isNaN(value) || value <= 0) {
      alert("Weight must be greater than 0");
      return;
    }

    try {
      setSaving(true);

      await apiFetch("/api/leftover", {
        method: "POST",
        body: JSON.stringify({
          groupId: Number(groupId),
          leftoverKg: value,
          userId: user.id,
        }),
      });

      alert("Leftover saved successfully");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Failed to save leftover");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page">
      {/* HEADER */}
      <div className="page-header">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h2 className="page-title">{groupTitle}</h2>
      </div>

      <p className="subtitle">Record leftover feed weight</p>

      {/* MODE SWITCH */}
      <button
        className="switch-btn"
        onClick={() => {
          setUseLoadCell(!useLoadCell);
          setWeight("0");
          setStable(false);
        }}
      >
        {useLoadCell ? "Use Manual Entry" : "Use Load Cell"}
      </button>

      {/* LOAD CELL MODE */}
      {useLoadCell ? (
        <div className="box">
          <h4>Weight from Load Cell</h4>

          <div className={`display-box ${stable ? "stable" : ""}`}>
            {weight} kg
          </div>

          <p className="hint">
            {stable ? "Weight stable" : "Waiting for stable weight..."}
          </p>
        </div>
      ) : (
        /* MANUAL ENTRY */
        <div className="box">
          <h4>Enter Weight (kg)</h4>

          <input
            className="weight-input"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight"
          />

          <button className="clear-btn" onClick={() => setWeight("0")}>
            Clear
          </button>
        </div>
      )}

      {/* SAVE */}
      <button className="save-btn" onClick={saveLeftover} disabled={saving}>
        {saving ? "Saving..." : "Save Leftover"}
      </button>
    </div>
  );
}
