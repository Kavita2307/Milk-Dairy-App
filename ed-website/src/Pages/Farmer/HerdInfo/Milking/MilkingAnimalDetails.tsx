// import { useState } from "react";
// import { apiFetch } from "../../../app/fetcher";
// import FarmerSidebar from "../FarmerSidebar";

// export default function AnimalDetails() {
//   const [form, setForm] = useState<any>({
//     animalNumber: "",
//     age: "",
//     weight: "",
//     lactationNo: "",
//     dateOfCalving: "",
//     milkYield: "",
//     damNo: "",
//     bullName: "",
//     damPrevYield: "",
//     bcs: "",
//     dungScore: "",
//     lameness: "",
//     teatScore: "",
//     vaccination: "",
//     otherConditions: "",
//   });

//   const handleChange = (e: any) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const save = async () => {
//     const payload = {
//       ageMonths: form.age,
//       bodyWeightKg: form.weight,
//       lactationNo: form.lactationNo,
//       dateOfCalving: form.dateOfCalving,
//       milkYield7DayAvg: form.milkYield,
//       pedigree: {
//         damNo: form.damNo,
//         bullName: form.bullName,
//         damPrevYieldKg: form.damPrevYield,
//       },
//       health: {
//         bcs: form.bcs,
//         dungScore: form.dungScore,
//         lameness: form.lameness,
//         teatScore: form.teatScore,
//         vaccination: form.vaccination.split(","),
//         otherConditions: form.otherConditions,
//       },
//     };

//     await apiFetch("/animals", {
//       method: "POST",
//       body: JSON.stringify({
//         animalNumber: form.animalNumber,
//         groupId: 1,
//         userId: 1,
//         details: payload,
//       }),
//     });

//     alert("Animal details saved");
//   };

//   return (
//     <div className="farmer-container">
//       <FarmerSidebar />
//       <div className="animal-form">
//         <h2>Animal Details</h2>

//         <div className="form-grid">
//           <input
//             name="animalNumber"
//             placeholder="Animal Number"
//             onChange={handleChange}
//           />
//           <input
//             name="age"
//             placeholder="Age (Months)"
//             onChange={handleChange}
//           />
//           <input
//             name="weight"
//             placeholder="Weight (kg)"
//             onChange={handleChange}
//           />
//           <input
//             name="lactationNo"
//             placeholder="Lactation No"
//             onChange={handleChange}
//           />
//           <input type="date" name="dateOfCalving" onChange={handleChange} />
//           <input
//             name="milkYield"
//             placeholder="Milk Yield (7 Day Avg)"
//             onChange={handleChange}
//           />
//         </div>

//         <h3>Pedigree</h3>
//         <div className="form-grid">
//           <input name="damNo" placeholder="Dam No" onChange={handleChange} />
//           <input
//             name="bullName"
//             placeholder="Bull Name"
//             onChange={handleChange}
//           />
//           <input
//             name="damPrevYield"
//             placeholder="Dam Prev Yield"
//             onChange={handleChange}
//           />
//         </div>

//         <h3>Health</h3>
//         <div className="form-grid">
//           <input name="bcs" placeholder="BCS" onChange={handleChange} />
//           <input
//             name="dungScore"
//             placeholder="Dung Score"
//             onChange={handleChange}
//           />
//           <input
//             name="lameness"
//             placeholder="Lameness"
//             onChange={handleChange}
//           />
//           <input
//             name="teatScore"
//             placeholder="Teat Score"
//             onChange={handleChange}
//           />
//           <input
//             name="vaccination"
//             placeholder="Vaccination (comma separated)"
//             onChange={handleChange}
//           />
//           <textarea
//             name="otherConditions"
//             placeholder="Other Conditions"
//             onChange={handleChange}
//           />
//         </div>

//         <button className="save-btn" onClick={save}>
//           Save
//         </button>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export default function MilkingAnimalDetails() {
  const navigate = useNavigate();
  const { groupId, animalNumber } = useParams();

  const isEdit = Boolean(animalNumber);

  const [form, setForm] = useState({
    animalNumber: "",
    breed: "",
    ageMonths: "",
    bodyWeightKg: "",
    lactationNo: "",
    dateOfCalving: "",
    milkYield7DayAvg: "",
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
      const res = await apiFetch(`/api/animals/${animalNumber}`);
      const animal = await res.json();
      console.log("RAW RESPONSE:", res);
      console.log("PARSED JSON:", animal);

      const d = animal.details ?? {};

      setForm({
        animalNumber: String(animal.animalNumber ?? ""),

        breed: String(d.breed ?? ""),
        ageMonths: String(d.ageMonths ?? ""),
        bodyWeightKg: String(d.bodyWeightKg ?? ""),
        lactationNo: String(d.lactationNo ?? ""),
        dateOfCalving: d.dateOfCalving ? d.dateOfCalving.split("T")[0] : "",
        milkYield7DayAvg: String(d.milkYield7DayAvg ?? ""),

        damNo: String(d.pedigree?.damNo ?? ""),
        bullName: String(d.pedigree?.bullName ?? ""),
        damPrevYieldKg: String(d.pedigree?.damPrevYieldKg ?? ""),

        bcs: String(d.health?.bcs ?? ""),
        dungScore: String(d.health?.dungScore ?? ""),
        lameness: String(d.health?.lameness ?? ""),
        teatScore: String(d.health?.teatScore ?? ""),

        vaccination: Array.isArray(d.health?.vaccination)
          ? d.health.vaccination.join(", ")
          : "",

        otherConditions: String(d.health?.otherConditions ?? ""),
      });
      console.log("load data: ", form);
    } catch (err) {
      console.error(err);
      alert("Failed to load animal details");
    }
  };

  useEffect(() => {
    if (!isEdit || !animalNumber) return;
    (async () => {
      await loadAnimal();
    })();
  }, [animalNumber, isEdit]);

  const auth = useContext(AuthContext);
  if (!auth?.user) return null;
  const { user } = auth;

  /* ================= SAVE ================= */
  const save = async () => {
    const details = {
      breed: form.breed,
      ageMonths: form.ageMonths,
      bodyWeightKg: form.bodyWeightKg,
      lactationNo: form.lactationNo,
      dateOfCalving: form.dateOfCalving,
      milkYield7DayAvg: form.milkYield7DayAvg,
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
        vaccination: form.vaccination
          ? form.vaccination.split(",").map((v) => v.trim())
          : [],
        otherConditions: form.otherConditions,
      },
    };

    try {
      if (isEdit) {
        // ✅ CORRECT UPDATE API
        await apiFetch("/api/animals/update-details", {
          method: "PUT",
          body: JSON.stringify({
            animalNumber: Number(animalNumber),
            userId: user.id,
            details,
          }),
        });
      } else {
        // ✅ CREATE API (already correct)
        await apiFetch("/api/animals", {
          method: "POST",
          body: JSON.stringify({
            animalNumber: form.animalNumber,
            groupId: Number(groupId),
            userId: user.id,
            details,
          }),
        });
      }

      navigate(`/farmer/milking/${groupId}`);
    } catch (err) {
      console.error(err);
      alert("Failed to save animal");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="animal-content">
      <div className="animal-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h2>{isEdit ? "Update Milking Animal" : "Add Milking Animal"}</h2>
      </div>

      {/* BASIC */}
      <section className="card">
        <div className="form-grid">
          <input
            placeholder="Animal Number"
            value={form.animalNumber}
            disabled={isEdit}
            onChange={(e) => setForm({ ...form, animalNumber: e.target.value })}
          />

          <select
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
            placeholder="Age (Months)"
            value={form.ageMonths}
            onChange={(e) => setForm({ ...form, ageMonths: e.target.value })}
          />

          <input
            placeholder="Weight (kg)"
            value={form.bodyWeightKg}
            onChange={(e) => setForm({ ...form, bodyWeightKg: e.target.value })}
          />

          <input
            placeholder="Lactation No"
            value={form.lactationNo}
            onChange={(e) => setForm({ ...form, lactationNo: e.target.value })}
          />

          <input
            type="date"
            value={form.dateOfCalving}
            onChange={(e) =>
              setForm({ ...form, dateOfCalving: e.target.value })
            }
          />

          <input
            placeholder="Milk Yield (7 Day Avg)"
            value={form.milkYield7DayAvg}
            onChange={(e) =>
              setForm({ ...form, milkYield7DayAvg: e.target.value })
            }
          />
        </div>
      </section>

      {/* PEDIGREE */}
      <section className="card">
        <div className="form-grid">
          <input
            placeholder="Dam No"
            value={form.damNo}
            onChange={(e) => setForm({ ...form, damNo: e.target.value })}
          />
          <input
            placeholder="Bull Name"
            value={form.bullName}
            onChange={(e) => setForm({ ...form, bullName: e.target.value })}
          />
          <input
            placeholder="Dam Previous Yield"
            value={form.damPrevYieldKg}
            onChange={(e) =>
              setForm({ ...form, damPrevYieldKg: e.target.value })
            }
          />
        </div>
      </section>

      {/* HEALTH */}
      <section className="card">
        <div className="form-grid">
          <input
            placeholder="BCS (1–5)"
            value={form.bcs}
            onChange={(e) => setForm({ ...form, bcs: e.target.value })}
          />
          <input
            placeholder="Dung Score (1–5)"
            value={form.dungScore}
            onChange={(e) => setForm({ ...form, dungScore: e.target.value })}
          />
          <input
            placeholder="Lameness (1–5)"
            value={form.lameness}
            onChange={(e) => setForm({ ...form, lameness: e.target.value })}
          />
          <input
            placeholder="Teat Score (1–4)"
            value={form.teatScore}
            onChange={(e) => setForm({ ...form, teatScore: e.target.value })}
          />
          <input
            placeholder="Vaccination (comma separated)"
            value={form.vaccination}
            onChange={(e) => setForm({ ...form, vaccination: e.target.value })}
          />
          <textarea
            placeholder="Other Conditions"
            value={form.otherConditions}
            onChange={(e) =>
              setForm({ ...form, otherConditions: e.target.value })
            }
          />
        </div>
      </section>

      <button className="save-btn" onClick={save}>
        {isEdit ? "Update" : "Save"}
      </button>
    </div>
  );
}
