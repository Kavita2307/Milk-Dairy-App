import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "@/app/fetcher";
import { AuthContext } from "@/features/auth/authContext";
import "@/styles/reports.css";
import { Line } from "react-chartjs-2";
import { exportToExcel, exportToPDF } from "@/components/exportUtils";

interface Row {
  date: string;
  group1: number;
  group2: number;
  group3: number;
}

export default function DryMatterIntake() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);

  const lineData = {
    labels: rows.map((r) => new Date(r.date).toLocaleDateString()),
    datasets: [
      {
        label: "Group 1",
        data: rows.map((r) => r.group1),
        borderColor: "#2563eb",
      },
      {
        label: "Group 2",
        data: rows.map((r) => r.group2),
        borderColor: "#16a34a",
      },
      {
        label: "Group 3",
        data: rows.map((r) => r.group3),
        borderColor: "#dc2626",
      },
    ],
  };

  const exportExcel = () => {
    exportToExcel(rows, "Dry_Matter_Intake");
  };

  const exportPDF = () => {
    exportToPDF(
      ["Date", "Group 1", "Group 2", "Group 3"],
      rows.map((r) => [r.date, r.group1, r.group2, r.group3]),
      "Dry Matter Intake"
    );
  };

  useEffect(() => {
    loadReport();
  }, []);

  if (!auth?.user) return null;
  const { user } = auth;

  const loadReport = async () => {
    try {
      setLoading(true);

      const res = await apiFetch(
        `/api/reports/dry-matter-intake?userId=${user.id}`
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

  return (
    <div className="page">
      {/* HEADER */}
      <div className="page-header">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h2 className="page-title">Dry Matter Intake (7 Days)</h2>
      </div>
      <div className="action-bar">
        <button onClick={exportExcel}>Export Excel</button>
        <button onClick={exportPDF}>Export PDF</button>
      </div>

      <div className="chart-card">
        <Line data={lineData} />
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
                <th>Date</th>
                <th>Group 1 (kg)</th>
                <th>Group 2 (kg)</th>
                <th>Group 3 (kg)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.date}>
                  <td>{new Date(r.date).toLocaleDateString()}</td>
                  <td>{r.group1.toFixed(2)}</td>
                  <td>{r.group2.toFixed(2)}</td>
                  <td>{r.group3.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
