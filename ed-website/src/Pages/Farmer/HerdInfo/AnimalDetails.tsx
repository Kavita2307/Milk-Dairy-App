import { useState } from "react";
import { apiFetch } from "../../../app/fetcher";
import FarmerSidebar from "../FarmerSidebar";

export default function AnimalDetails() {
  const [form, setForm] = useState<any>({
    animalNumber: "",
    age: "",
    weight: "",
    lactationNo: "",
    dateOfCalving: "",
    milkYield: "",
    damNo: "",
    bullName: "",
    damPrevYield: "",
    bcs: "",
    dungScore: "",
    lameness: "",
    teatScore: "",
    vaccination: "",
    otherConditions: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const save = async () => {
    const payload = {
      ageMonths: form.age,
      bodyWeightKg: form.weight,
      lactationNo: form.lactationNo,
      dateOfCalving: form.dateOfCalving,
      milkYield7DayAvg: form.milkYield,
      pedigree: {
        damNo: form.damNo,
        bullName: form.bullName,
        damPrevYieldKg: form.damPrevYield,
      },
      health: {
        bcs: form.bcs,
        dungScore: form.dungScore,
        lameness: form.lameness,
        teatScore: form.teatScore,
        vaccination: form.vaccination.split(","),
        otherConditions: form.otherConditions,
      },
    };

    await apiFetch("/animals", {
      method: "POST",
      body: JSON.stringify({
        animalNumber: form.animalNumber,
        groupId: 1,
        userId: 1,
        details: payload,
      }),
    });

    alert("Animal details saved");
  };

  return (
    <div className="farmer-container">
      <FarmerSidebar />
      <div className="animal-form">
        <h2>Animal Details</h2>

        <div className="form-grid">
          <input
            name="animalNumber"
            placeholder="Animal Number"
            onChange={handleChange}
          />
          <input
            name="age"
            placeholder="Age (Months)"
            onChange={handleChange}
          />
          <input
            name="weight"
            placeholder="Weight (kg)"
            onChange={handleChange}
          />
          <input
            name="lactationNo"
            placeholder="Lactation No"
            onChange={handleChange}
          />
          <input type="date" name="dateOfCalving" onChange={handleChange} />
          <input
            name="milkYield"
            placeholder="Milk Yield (7 Day Avg)"
            onChange={handleChange}
          />
        </div>

        <h3>Pedigree</h3>
        <div className="form-grid">
          <input name="damNo" placeholder="Dam No" onChange={handleChange} />
          <input
            name="bullName"
            placeholder="Bull Name"
            onChange={handleChange}
          />
          <input
            name="damPrevYield"
            placeholder="Dam Prev Yield"
            onChange={handleChange}
          />
        </div>

        <h3>Health</h3>
        <div className="form-grid">
          <input name="bcs" placeholder="BCS" onChange={handleChange} />
          <input
            name="dungScore"
            placeholder="Dung Score"
            onChange={handleChange}
          />
          <input
            name="lameness"
            placeholder="Lameness"
            onChange={handleChange}
          />
          <input
            name="teatScore"
            placeholder="Teat Score"
            onChange={handleChange}
          />
          <input
            name="vaccination"
            placeholder="Vaccination (comma separated)"
            onChange={handleChange}
          />
          <textarea
            name="otherConditions"
            placeholder="Other Conditions"
            onChange={handleChange}
          />
        </div>

        <button className="save-btn" onClick={save}>
          Save
        </button>
      </div>
    </div>
  );
}
