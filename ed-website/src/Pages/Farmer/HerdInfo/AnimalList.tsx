import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { apiFetch } from "@/app/fetcher";
import { AuthContext } from "@/features/auth/authContext";
import FarmerSidebar from "../FarmerSidebar";

export default function AnimalList() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("AuthContext must be used inside AuthProvider");
  }

  const { user, logout } = auth;
  const userId = user?.id;
  console.log("user : ", userId);
  // passed from group card navigation
  const { groupTitle } = (location.state || {}) as {
    groupTitle?: string;
  };

  const [animals, setAnimals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (groupId && userId) {
      loadAnimals();
    }
  }, [groupId, userId]);

  const loadAnimals = async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/api/animals");
      const data = await res.json();

      console.log("ANIMALS API RESPONSE:", data);

      //  FILTER BY groupId AND userId
      const filtered = data.filter(
        (a: any) =>
          Number(a.groupId) === Number(groupId) &&
          Number(a.userId) === Number(userId)
      );

      setAnimals(filtered);
      console.log("userid groupid", userId, groupId);
      console.log("animal list: ", animals);
    } catch (err) {
      console.error("LOAD ANIMALS ERROR:", err);
      alert("Failed to load animals");
    } finally {
      setLoading(false);
    }
  };

  const isMilking = Number(groupId) < 4;
  return (
    <div className="farmer-container">
      {/* LEFT SIDEBAR */}
      <FarmerSidebar />

      <div className="page">
        {/* TOP BAR */}
        <div className="animal-topbar">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            ← Back
          </button>

          <div className="animal-menubar">
            <span className="menu-title">
              {groupTitle || `Group ${groupId}`} – Animals
            </span>

            <button
              className="add-btn"
              onClick={() => {
                if (isMilking) {
                  navigate(`/farmer/milking/${groupId}/add`);
                } else {
                  navigate(`/farmer/non-milking/${groupId}/add`);
                }
              }}
            >
              ➕ Add New Animal
            </button>
          </div>
        </div>

        {/* EMPTY STATE */}
        {!loading && animals.length === 0 && (
          <div className="empty-box">
            <div className="empty-icon">🐄</div>
            <h3>No animals added</h3>
            <p>Click “Add New Animal” to get started</p>
          </div>
        )}

        {/* ANIMAL LIST */}
        {!loading && animals.length > 0 && (
          <div className="animal-cards">
            {animals.map((item) => (
              <div
                key={item.id}
                className="animal-card"
                onClick={() => {
                  if (isMilking) {
                    navigate(
                      `/farmer/milking/${groupId}/edit/${item.animalNumber}`
                    );
                  } else {
                    navigate(
                      `/farmer/non-milking/${groupId}/edit/${item.animalNumber}`
                    );
                  }
                }}
              >
                <div className="animal-icon">🐄</div>

                <div className="animal-text">
                  <h4>Animal #{item.animalNumber}</h4>
                  <span className="animal-sub">
                    Click to view / update details
                  </span>
                </div>

                <div className="arrow">›</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
