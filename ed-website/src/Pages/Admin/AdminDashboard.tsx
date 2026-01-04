import { useEffect, useState } from "react";
import { apiFetch } from "@/app/fetcher";
import "@/styles/admin.css";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [tab, setTab] = useState<"accepted" | "pending">("pending");
  const [farmers, setFarmers] = useState<any[]>([]);
  const navigate = useNavigate();

  const loadFarmers = async () => {
    const res = await apiFetch(
      `/api/admin/farmers?approved=${tab === "accepted"}`
    );
    const data = await res.json();
    setFarmers(data);
  };
  useEffect(() => {
    const t = setTimeout(() => {
      loadFarmers();
    }, 0);
    return () => clearTimeout(t);
  }, [tab]);

  const updateStatus = async (id: number, approve: boolean) => {
    await apiFetch("/api/admin/farmer/approve", {
      method: "POST",
      body: JSON.stringify({ farmerId: id, approve }),
    });
    loadFarmers();
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h2>Farmer List</h2>

        <div className="tabs">
          <button
            className={tab === "accepted" ? "active" : ""}
            onClick={() => setTab("accepted")}
          >
            Accepted Farmers
          </button>

          <button
            className={tab === "pending" ? "active" : ""}
            onClick={() => setTab("pending")}
          >
            Not Accepted Farmers
          </button>
          <button onClick={() => navigate("/admin/ration")}>
            Ration Management
          </button>
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {farmers.map((f) => (
            <tr key={f.id}>
              <td>{f.name}</td>
              <td>{f.email}</td>
              <td>{new Date(f.createdAt).toLocaleDateString()}</td>

              <td>
                {tab === "pending" ? (
                  <>
                    <button
                      className="approve"
                      onClick={() => updateStatus(f.id, true)}
                    >
                      Accept
                    </button>
                    <button
                      className="reject"
                      onClick={() => updateStatus(f.id, false)}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <button
                    className="view"
                    onClick={() => navigate(`/admin/farmer/${f.id}`)}
                  >
                    View
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
