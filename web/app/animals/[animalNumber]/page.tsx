"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import API from "../../../src/lib/api";
import Navbar from "../../../src/components/Navbar";

export default function AnimalDetails() {
  const { animalNumber } = useParams();
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    API.get(`/animals/${animalNumber}`).then((res) =>
      setDetails(res.data.details)
    );
  }, [animalNumber]);

  if (!details) return <p>Loading...</p>;

  return (
    <>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Animal {animalNumber}</h2>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold mb-2">Basic Information</h3>
          <p>Age: {details.ageMonths} months</p>
          <p>Weight: {details.bodyWeightKg} kg</p>
          <p>Lactation No: {details.lactationNo}</p>
          <p>Date of Calving: {details.dateOfCalving}</p>

          <h3 className="font-semibold mt-4 mb-2">Health</h3>
          <p>BCS: {details.health?.bcs}</p>
          <p>Vaccination: {details.health?.vaccination?.join(", ")}</p>
        </div>
      </div>
    </>
  );
}
