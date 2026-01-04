import { useParams } from "react-router-dom";
import FarmerDashboard from "../Farmer/FarmerDashboard";

export default function AdminFarmerView() {
  const { id } = useParams();

  return <FarmerDashboard adminView={true} farmerId={Number(id)} />;
}
