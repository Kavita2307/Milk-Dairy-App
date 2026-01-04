import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "@/app/fetcher";
import { AuthContext } from "@/features/auth/authContext";
import "@/styles/reports.css";
import { Bar } from "react-chartjs-2";
import { exportToExcel, exportToPDF } from "@/components/exportUtils";

interface GroupRow {
  groupId: number;
  feedKg: number;
  milkLit: number;
  feedPerLit: number;
}

export default function DailyFeedEfficiency() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);
  const [groups, setGroups] = useState<GroupRow[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const barData = {
    labels: groups.map((g) => `Group ${g.groupId}`),
    datasets: [
      {
        label: "Feed per Litre",
        data: groups.map((g) => g.feedPerLit),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const exportExcel = () => {
    exportToExcel(groups, "Daily_Feed_Efficiency");
  };

  const exportPDF = () => {
    exportToPDF(
      ["Group", "Feed (kg)", "Milk (L)", "Feed/L"],
      groups.map((g) => [
        `Group ${g.groupId}`,
        g.feedKg,
        g.milkLit,
        g.feedPerLit,
      ]),
      "Daily Feed Efficiency"
    );
  };

  useEffect(() => {
    loadReport();
  }, [date]);

  if (!auth?.user) return null;
  const { user } = auth;

  const loadReport = async () => {
    try {
      setLoading(true);

      const res = await apiFetch(
        `/api/reports/daily-feed-efficiency?date=${date}&userId=${user.id}`
      );
      const data = await res.json();

      setSummary(data.summary);
      setGroups(data.groups || []);
    } catch (err) {
      console.error(err);
      setGroups([]);
      setSummary(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      {/* HEADER */}
      <div className="page-header">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h2 className="page-title">Daily Feed Efficiency</h2>
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
      {summary && (
        <div className="summary-grid">
          <div className="summary-card">
            <p>Total Feed (kg)</p>
            <h3>{summary.totalFeed.toFixed(2)}</h3>
          </div>

          <div className="summary-card">
            <p>Total Milk (L)</p>
            <h3>{summary.totalMilk.toFixed(2)}</h3>
          </div>

          <div className="summary-card">
            <p>Feed / Litre</p>
            <h3>{summary.feedPerLit.toFixed(2)}</h3>
          </div>
        </div>
      )}
      <div className="action-bar">
        <button onClick={exportExcel}>Export Excel</button>
        <button onClick={exportPDF}>Export PDF</button>
      </div>

      <div className="chart-card">
        <Bar data={barData} />
      </div>

      {/* TABLE */}
      <div className="table-card">
        {loading ? (
          <p className="muted">Loading...</p>
        ) : groups.length === 0 ? (
          <p className="muted">No data available</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Group</th>
                <th>Feed (kg)</th>
                <th>Milk (L)</th>
                <th>Feed / L</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((g) => (
                <tr key={g.groupId}>
                  <td>Group {g.groupId}</td>
                  <td>{g.feedKg.toFixed(2)}</td>
                  <td>{g.milkLit.toFixed(2)}</td>
                  <td>{g.feedPerLit.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
