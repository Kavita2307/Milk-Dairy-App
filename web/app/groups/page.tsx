"use client";

import { useEffect, useState } from "react";
import API from "../../src/lib/api";
import Navbar from "../../src/components/Navbar";

export default function GroupsPage() {
  const [groups, setGroups] = useState<any[]>([]);

  useEffect(() => {
    API.get("/groups").then((res) => {
      setGroups(res.data);
    });
  }, []);

  return (
    <>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Groups</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {groups.map((group) => (
            <div
              key={group.id}
              className="bg-white p-4 rounded shadow cursor-pointer"
            >
              <h3 className="font-semibold">{group.name}</h3>
              <p className="text-gray-500">{group.type}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
