"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import API from "../../../src/lib/api";

export default function GroupPage() {
  const { groupId } = useParams();
  const router = useRouter();
  const [animals, setAnimals] = useState([]);

  const loadAnimals = () => {
    API.get("/animals").then((res) => {
      setAnimals(res.data.filter((a: any) => a.groupId === groupId));
    });
  };
  useEffect(() => {
    loadAnimals();
  }, [groupId]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Animals in Group {groupId}
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {animals.map((a: any) => (
          <div
            key={a.id}
            onClick={() =>
              router.push(`/herdInfo/${groupId}/${a.animalNumber}`)
            }
            className="cursor-pointer bg-white shadow-lg rounded-2xl p-6 border hover:shadow-xl transition"
          >
            <h2 className="text-xl font-bold text-gray-800">
              Animal #{a.animalNumber}
            </h2>

            <p className="text-gray-600 text-sm mt-2">
              Age: {a.details?.ageMonths ?? "-"} months
            </p>

            <p className="text-gray-600 text-sm">
              Weight: {a.details?.bodyWeightKg ?? "-"} kg
            </p>

            <p className="text-gray-600 text-sm">
              Lactation No: {a.details?.lactationNo ?? "-"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
