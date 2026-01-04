import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { apiFetch } from "@/app/fetcher";
import { AuthContext } from "@/features/auth/authContext";

export default function MilkingAnimalList() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const authContext = useContext(AuthContext);
  const { user } = authContext || { user: null };

  const shift = location.state?.shift;
  const [animals, setAnimals] = useState<any[]>([]);

  useEffect(() => {
    apiFetch("/api/animals")
      .then((r) => r.json())
      .then((data) =>
        setAnimals(
          data.filter(
            (a: any) => a.groupId === Number(groupId) && a.userId === user.id
          )
        )
      );
  }, [groupId]);

  return (
    <div className="page">
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2 className="page-title">Animal List ({shift})</h2>

      {user &&
        animals.map((a) => (
          <div
            key={a.id}
            className="milk-card"
            onClick={() =>
              navigate(`/farmer/milk/${groupId}/produce`, {
                state: {
                  animalNumber: a.animalNumber,
                  shift,
                },
              })
            }
          >
            Animal #{a.animalNumber}
            <span>›</span>
          </div>
        ))}
    </div>
  );
}
