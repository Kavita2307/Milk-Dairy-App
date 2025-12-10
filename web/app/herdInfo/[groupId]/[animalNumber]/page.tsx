"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "../../../../src/lib/api";

export default function AnimalDetails() {
  const { groupId, animalNumber } = useParams();
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const res = await API.get(`/animals/${animalNumber}`);
      setDetails(res.data.details || {});
    };
    load();
  }, []);

  const calcDaysInMilk = (date: string) => {
    if (!date) return "-";
    const calving = new Date(date);
    const diff = Date.now() - calving.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">
        Animal #{animalNumber} (Group {groupId})
      </h1>

      <div className="bg-white shadow-xl rounded-3xl p-6 border">
        {/* Basic Info */}
        <h2 className="text-xl font-bold mb-3">Basic Information</h2>
        <p>Age: {details.ageMonths} months</p>
        <p>Weight: {details.bodyWeightKg} kg</p>
        <p>Lactation No: {details.lactationNo}</p>
        <p>Date of Calving: {details.dateOfCalving}</p>
        <p>
          Days in Milk:{" "}
          <span className="font-bold text-green-700">
            {calcDaysInMilk(details.dateOfCalving)}
          </span>
        </p>

        {/* Milk */}
        <h2 className="text-xl font-bold mt-6 mb-3">Milk Details</h2>
        <p>7-Day Avg: {details.milkYield7DayAvg} kg</p>

        {/* Pedigree */}
        <h2 className="text-xl font-bold mt-6 mb-3">Pedigree</h2>
        <p>Dam No: {details.pedigree?.damNo}</p>
        <p>Bull Name: {details.pedigree?.bullName}</p>
        <p>Dam Previous Yield: {details.pedigree?.damPrevYieldKg} kg</p>

        {/* Health */}
        <h2 className="text-xl font-bold mt-6 mb-3">Health</h2>
        <p>BCS: {details.health?.bcs}</p>
        <p>Dung Score: {details.health?.dungScore}</p>
        <p>Lameness: {details.health?.lameness}</p>
        <p>Teat Score: {details.health?.teatScore}</p>
        <p>Vaccination: {details.health?.vaccination?.join(", ")}</p>
        <p>Other: {details.health?.otherConditions}</p>
      </div>
    </div>
  );
}
