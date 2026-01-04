import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "@/app/fetcher";
import { AuthContext } from "@/features/auth/authContext";
import "@/styles/reports.css";

interface Row {
  groupId: number;
  milk: number;
}

export default function GroupWiseMilkYield() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadReport();
  }, [date]);

  if (!auth?.user) return null;

  const { user } = auth;
  const loadReport = async () => {
    try {
      setLoading(true);

      const res = await apiFetch(
        `/api/reports/milk-yield/group-wise?date=${date}&userId=${user.id}`
      );
      const data = await res.json();

      setRows(data || []);
    } catch (err) {
      console.error(err);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  const totalMilk = rows.reduce((sum, r) => sum + r.milk, 0);

  return (
    <div className="page">
      {/* HEADER */}
      <div className="page-header">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h2 className="page-title">Group Wise Milk Yield</h2>
      </div>

      {/* FILTER */}
      <div className="filter-bar">
        <label>Select Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* SUMMARY */}
      <div className="summary-card">
        <p>Total Milk</p>
        <h3>{totalMilk.toFixed(2)} L</h3>
      </div>

      {/* TABLE */}
      <div className="table-card">
        {loading ? (
          <p className="muted">Loading...</p>
        ) : rows.length === 0 ? (
          <p className="muted">No data available</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Group</th>
                <th>Milk (L)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.groupId}>
                  <td>Group {r.groupId}</td>
                  <td>{r.milk.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
