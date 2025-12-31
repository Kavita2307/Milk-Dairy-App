import { Routes, Route } from "react-router-dom";
import FarmerDashboard from "../Pages/Farmer/FarmerDashboard";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import Register from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/Login";
import HerdInfo from "../Pages/Farmer/HerdInfo/HerdInfo";
import MilkingGroups from "../Pages/Farmer/HerdInfo/Milking/MilkingGroups";
import MilkingAnimalDetails from "../Pages/Farmer/HerdInfo/Milking/MilkingAnimalDetails";
import NonMilkingGroups from "../Pages/Farmer/HerdInfo/NonMilking/NonMilkingGroups";
import NonMilkingAnimalDetails from "../Pages/Farmer/HerdInfo/NonMilking/NonMilkingAnimalDetails";
import AnimalList from "../Pages/Farmer/HerdInfo/AnimalList";

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
      <Route path="/farmer/herd/non-milking" element={<NonMilkingGroups />} />
      <Route
        path="/farmer/milking/:groupId/add"
        element={<MilkingAnimalDetails />}
      />
      <Route
        path="/farmer/milking/:groupId/edit/:animalNumber"
        element={<MilkingAnimalDetails />}
      />

      <Route
        path="/farmer/non-milking/:groupId/add"
        element={<NonMilkingAnimalDetails />}
      />
      <Route
        path="/farmer/non-milking/:groupId/edit/:animalNumber"
        element={<NonMilkingAnimalDetails />}
      />
      <Route path="/farmer/milking/:groupId" element={<AnimalList />} />
      <Route path="/farmer/non-milking/:groupId" element={<AnimalList />} />
    </Routes>
  );
}
