"use client";

import Navbar from "../../../src/components/Navbar";
import API from "../../../src/lib/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type MilkPoint = {
  date: string;
  milkLit: number;
};

export default function MilkingGroupDetailsPage() {
  const params = useParams();
  const groupId = Number(params.groupId);
  const [data, setData] = useState<MilkPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/analytics/milk/group/${groupId}/last7`)
      .then((res) => setData(res.data))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, [groupId]);

  return (
    <>
      <Navbar />

      <main className="p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          Milking Group {groupId} – Last 7 Days
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : data.length === 0 ? (
          <p>No milk data found.</p>
        ) : (
          <div className="bg-white p-4 rounded-xl shadow mb-6">
            <h2 className="font-semibold mb-3">
              Milk Production (Litres) – last 7 days
            </h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="milkLit"
                    stroke="#2563EB"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* You can add animal list below later */}
      </main>
    </>
  );
}
