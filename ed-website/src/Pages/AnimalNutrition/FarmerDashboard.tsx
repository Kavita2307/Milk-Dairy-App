import { useNavigate } from "react-router-dom";

export default function FarmerDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <h2>Farmers</h2>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Farmer</th>
            <th>Place</th>
            <th>District</th>
            <th>No of Animals</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nithin</td>
            <td>Srirampur</td>
            <td>Nagar</td>
            <td>20</td>
            <td>
              <button onClick={() => navigate("/farmer/1")}>View</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
