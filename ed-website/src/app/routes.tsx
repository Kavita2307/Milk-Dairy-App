import { Routes, Route } from "react-router-dom";
import Login from "../Pages/AnimalNutrition/Login";
import FarmerDashboard from "../Pages/AnimalNutrition/FarmerDashboard";
import OfficialDashboard from "../Pages/AnimalNutrition/OfficialDashboard";
import FarmerView from "../Pages/AnimalNutrition/FarmerView";
import { ProtectedRoute } from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/animal-nutrition/login" element={<Login />} />

      <Route element={<ProtectedRoute role="farmer" />}>
        <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
        <Route path="/farmer/:id" element={<FarmerView />} />
      </Route>

      <Route element={<ProtectedRoute role="official" />}>
        <Route path="/official/dashboard" element={<OfficialDashboard />} />
      </Route>
    </Routes>
  );
}
