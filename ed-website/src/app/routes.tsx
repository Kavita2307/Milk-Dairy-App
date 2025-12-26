import { Routes, Route } from "react-router-dom";
import FarmerDashboard from "../Pages/Farmer/FarmerDashboard";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import FarmerView from "../Pages/Farmer/FarmerView";
import ProtectedRoute from "./ProtectedRoute";
import Register from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/Login";
import HerdInfo from "../Pages/Farmer/HerdInfo/HerdInfo";
import MilkingGroups from "../Pages/Farmer/HerdInfo/MilkingGroup";
import AnimalDetails from "../Pages/Farmer/HerdInfo/AnimalDetails";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ADMIN ROUTES */}
      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>

      {/* FARMER ROUTES */}
      <Route element={<ProtectedRoute role="farmer" />}>
        <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
      </Route>
      <Route path="/farmer/herd" element={<HerdInfo />} />
      <Route path="/farmer/herd/milking" element={<MilkingGroups />} />
      <Route path="/farmer/animals/:groupId" element={<AnimalDetails />} />
    </Routes>
  );
}
