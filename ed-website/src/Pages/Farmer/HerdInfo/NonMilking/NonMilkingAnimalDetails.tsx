import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiFetch } from "../../../../app/fetcher";
import "../../../../styles/details.css";
import { AuthContext } from "../../../../features/auth/authContext";

const breeds = [
  "Holstein Friesian",
  "Jersey",
  "Gir",
  "Sahiwal",
  "Red Sindhi",
  "Crossbred",
];

export default function NonMilkingAnimalDetails() {
  const { groupId, animalNumber } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const isEdit = Boolean(animalNumber);

  const [form, setForm] = useState({
    animalNumber: "",
    breed: "",
    ageMonths: "",
    bodyWeightKg: "",
    damNo: "",
    bullName: "",
    damPrevYieldKg: "",
    bcs: "",
    dungScore: "",
    lameness: "",
    teatScore: "",
    vaccination: "",
    otherConditions: "",
  });

  const loadAnimal = async () => {
    try {
      const animal = await apiFetch(`/api/animals/${animalNumber}`);
      const d = animal.details || {};

      setForm({
        animalNumber: animal.animalNumber,
        breed: d.breed || "",
        ageMonths: d.ageMonths || "",
        bodyWeightKg: d.bodyWeightKg || "",
        damNo: d.pedigree?.damNo || "",
        bullName: d.pedigree?.bullName || "",
        damPrevYieldKg: d.pedigree?.damPrevYieldKg || "",
        bcs: d.health?.bcs || "",
        dungScore: d.health?.dungScore || "",
        lameness: d.health?.lameness || "",
        teatScore: d.health?.teatScore || "",
        vaccination: d.health?.vaccination?.join(", ") || "",
        otherConditions: d.health?.otherConditions || "",
      });
    } catch {
      alert("Failed to load animal details");
    }
  };
  const saveAnimal = async () => {
    const payload = {
      animalNumber: form.animalNumber,
      groupId: Number(groupId),
      userId: user.id,
      details: {
        breed: form.breed,
        ageMonths: form.ageMonths,
        bodyWeightKg: form.bodyWeightKg,
        pedigree: {
          damNo: form.damNo,
          bullName: form.bullName,
          damPrevYieldKg: form.damPrevYieldKg,
        },
        health: {
          bcs: form.bcs,
          dungScore: form.dungScore,
          lameness: form.lameness,
          teatScore: form.teatScore,
          vaccination: form.vaccination.split(",").map((v) => v.trim()),
          otherConditions: form.otherConditions,
        },
      },
    };

    try {
      if (isEdit) {
        await apiFetch(`/api/animals/${animalNumber}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await apiFetch("/api/animals", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      navigate(`/farmer/non-milking/${groupId}`);
    } catch {
      alert("Failed to save animal details");
    }
  };
  useEffect(() => {
    if (isEdit) loadAnimal();
  }, [animalNumber]);
  return (
    <div className="animal-form">
      {/* HEADER */}
      <div className="animal-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h2>
          {isEdit ? "Update Non-Milking Animal" : "Add Non-Milking Animal"}
        </h2>{" "}
      </div>

      {/* BASIC INFO */}
      <section>
        <h3>Basic Information</h3>

        <input
          name="animalNumber"
          placeholder="Animal Number"
          value={form.animalNumber}
          disabled={isEdit}
          onChange={(e) => setForm({ ...form, animalNumber: e.target.value })}
        />

        {/* ✅ BREED DROPDOWN */}
        <select
          name="breed"
          value={form.breed}
          onChange={(e) => setForm({ ...form, breed: e.target.value })}
        >
          <option value="">Select Breed</option>
          {breeds.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <input
          name="ageMonths"
          placeholder="Age (Months)"
          value={form.ageMonths}
          onChange={(e) => setForm({ ...form, ageMonths: e.target.value })}
        />
        <input
          name="bodyWeightKg"
          placeholder="Body Weight (kg)"
          value={form.bodyWeightKg}
          onChange={(e) => setForm({ ...form, bodyWeightKg: e.target.value })}
        />
      </section>

      {/* PEDIGREE */}
      <section>
        <h3>Pedigree</h3>
        <input
          name="damNo"
          placeholder="Dam No / Name"
          value={form.damNo}
          onChange={(e) => setForm({ ...form, damNo: e.target.value })}
        />
        <input
          name="bullName"
          placeholder="Bull Name"
          value={form.bullName}
          onChange={(e) => setForm({ ...form, bullName: e.target.value })}
        />
        <input
          name="damPrevYieldKg"
          placeholder="Dam Previous Lactation Yield (kg)"
          value={form.damPrevYieldKg}
          onChange={(e) => setForm({ ...form, damPrevYieldKg: e.target.value })}
        />
      </section>

      {/* HEALTH */}
      <section>
        <h3>Health Parameters</h3>
        <input
          name="bcs"
          placeholder="BCS (1-5)"
          value={form.bcs}
          onChange={(e) => setForm({ ...form, bcs: e.target.value })}
        />
        <input
          name="dungScore"
          placeholder="Dung Score (1-5)"
          value={form.dungScore}
          onChange={(e) => setForm({ ...form, dungScore: e.target.value })}
        />
        <input
          name="lameness"
          placeholder="Lameness Score (1-5)"
          value={form.lameness}
          onChange={(e) => setForm({ ...form, lameness: e.target.value })}
        />
        <input
          name="teatScore"
          placeholder="Teat Score (1-4)"
          value={form.teatScore}
          onChange={(e) => setForm({ ...form, teatScore: e.target.value })}
        />
        <input
          name="vaccination"
          placeholder="Vaccination (comma separated)"
          value={form.vaccination}
          onChange={(e) => setForm({ ...form, vaccination: e.target.value })}
        />
        <textarea
          name="otherConditions"
          placeholder="Other Conditions"
          value={form.otherConditions}
          onChange={(e) =>
            setForm({ ...form, otherConditions: e.target.value })
          }
        />
      </section>

      <button className="save-btn" onClick={saveAnimal}>
        {isEdit ? "Update" : "Save"}
      </button>
    </div>
  );
}
