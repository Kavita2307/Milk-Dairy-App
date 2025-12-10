"use client";

import { useRouter } from "next/navigation";

const MILKING = [
  { id: 1, title: "Group 1 – High Yielder" },
  { id: 2, title: "Group 2 – Medium Yielder" },
  { id: 3, title: "Group 3 – Low Yielder" },
];

const NON_MILKING = [
  { id: 4, title: "Group 4 – Starter calf (0–2 months)" },
  { id: 5, title: "Group 5 – Starter calf (3–6 months)" },
  { id: 6, title: "Group 6 – Grower calf (6–12 months)" },
  { id: 7, title: "Group 7 – Heifer (12–24 months)" },
  { id: 8, title: "Group 8 – Dry cow (Far Off -60 to -21 days)" },
  { id: 9, title: "Group 9 – Dry cow (Close Up -21 to 0 days)" },
];

export default function HerdPage() {
  const router = useRouter();

  const openGroup = (id: number) => {
    router.push(`/herdInfo/${id}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">
        Herd Information
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* 🥛 Milking Group Card */}
        <div className="rounded-3xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white p-7 shadow-xl">
          <h2 className="text-2xl font-bold mb-5">Milking Groups</h2>

          <div className="space-y-4">
            {MILKING.map((g) => (
              <button
                key={g.id}
                onClick={() => openGroup(g.id)}
                className="w-full text-left px-5 py-4 rounded-xl bg-indigo-50/20 backdrop-blur-md hover:bg-white hover:text-indigo-700 transition font-semibold"
              >
                {g.title}
              </button>
            ))}
          </div>
        </div>

        {/* 🐄 Non Milking Group Card */}
        <div className="rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white p-7 shadow-xl">
          <h2 className="text-2xl font-bold mb-5">Non-Milking Groups</h2>

          <div className="space-y-4">
            {NON_MILKING.map((g) => (
              <button
                key={g.id}
                onClick={() => openGroup(g.id)}
                className="w-full text-left px-5 py-4 rounded-xl bg-emerald-50/20 backdrop-blur-md hover:bg-white hover:text-emerald-700 transition font-semibold"
              >
                {g.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
