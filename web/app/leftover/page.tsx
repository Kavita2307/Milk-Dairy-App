"use client";

import Navbar from "../../src/components/Navbar";
import API from "../../src/lib/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useMemo, useState } from "react";

type RawPoint = { date: string; groupId: number; leftoverKg: number };

export default function LeftoverPage() {
  const [raw, setRaw] = useState<RawPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/analytics/leftover/by-group")
      .then((res) => setRaw(res.data))
      .catch(() => setRaw([]))
      .finally(() => setLoading(false));
  }, []);

  // transform into { date, group1, group2, ... } for multi-line chart
  const chartData = useMemo(() => {
    const map: Record<string, any> = {};
    for (const row of raw) {
      if (!map[row.date]) map[row.date] = { date: row.date };
      map[row.date][`G${row.groupId}`] = row.leftoverKg;
    }
    return Object.values(map);
  }, [raw]);

  const groups = Array.from(new Set(raw.map((r) => r.groupId))).sort();

  return (
    <>
      <Navbar />
      <main className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Leftover Overview</h1>

        {loading ? (
          <p>Loading...</p>
        ) : chartData.length === 0 ? (
          <p>No leftover data found.</p>
        ) : (
          <div className="bg-white p-4 rounded-xl shadow mb-6">
            <h2 className="font-semibold mb-3">
              Leftover (Kg) – last 30 days per group
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {groups.map((g, idx) => (
                    <Line
                      key={g}
                      type="monotone"
                      dataKey={`G${g}`}
                      name={`Group ${g}`}
                      stroke={
                        ["#2563EB", "#10B981", "#FBBF24", "#EC4899"][idx % 4]
                      }
                      strokeWidth={2}
                      dot={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Detail table below */}
        {!loading && raw.length > 0 && (
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-3">Raw Leftover Data</h2>
            <div className="max-h-80 overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-1">Date</th>
                    <th className="text-left py-1">Group</th>
                    <th className="text-left py-1">Leftover (kg)</th>
                  </tr>
                </thead>
                <tbody>
                  {raw.map((row, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="py-1">{row.date}</td>
                      <td className="py-1">Group {row.groupId}</td>
                      <td className="py-1">{row.leftoverKg.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
