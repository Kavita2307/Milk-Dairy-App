import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiFetch } from "@/app/fetcher";
import "@/styles/admin.css";

export default function AdminRationDetails() {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [days, setDays] = useState("");
  const [kgPerAnimal, setKgPerAnimal] = useState("");
  const [ingredients, setIngredients] = useState<any[]>([]);

  useEffect(() => {
    const loadRation = async () => {
      const res = await apiFetch(`/api/admin/ration/${groupId}`);
      const data = await res.json();

      if (data) {
        setDays(String(data.days));
        setKgPerAnimal(String(data.kgPerAnimal));
        setIngredients(data.ingredients);
      }
    };

    loadRation();
  }, [groupId]);

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { name: "", quantityKg: "", dmPercent: "" },
    ]);
  };

  const save = async () => {
    await apiFetch("/api/admin/ration", {
      method: "POST",
      body: JSON.stringify({
        groupId: Number(groupId),
        days: Number(days),
        kgPerAnimal: Number(kgPerAnimal),
        ingredients: ingredients.map((i) => ({
          name: i.name,
          quantityKg: Number(i.quantityKg),
          dmPercent: Number(i.dmPercent),
        })),
      }),
    });

    alert("Ration saved");
    navigate("/admin/ration");
  };

  return (
    <div className="page">
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2 className="page-title">Group {groupId} Ration</h2>

      <div className="card">
        <input
          placeholder="Days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />

        <input
          placeholder="Kg per animal"
          value={kgPerAnimal}
          onChange={(e) => setKgPerAnimal(e.target.value)}
        />
      </div>

      <div className="card">
        <h3>Ingredients</h3>

        {ingredients.map((ing, idx) => (
          <div className="ingredient-row" key={idx}>
            <input
              placeholder="Name"
              value={ing.name}
              onChange={(e) => {
                const arr = [...ingredients];
                arr[idx].name = e.target.value;
                setIngredients(arr);
              }}
            />

            <input
              placeholder="Kg"
              value={ing.quantityKg}
              onChange={(e) => {
                const arr = [...ingredients];
                arr[idx].quantityKg = e.target.value;
                setIngredients(arr);
              }}
            />

            <input
              placeholder="DM %"
              value={ing.dmPercent}
              onChange={(e) => {
                const arr = [...ingredients];
                arr[idx].dmPercent = e.target.value;
                setIngredients(arr);
              }}
            />
          </div>
        ))}

        <button onClick={addIngredient}>+ Add Ingredient</button>
      </div>

      <button className="save-btn" onClick={save}>
        Save Ration
      </button>
    </div>
  );
}
