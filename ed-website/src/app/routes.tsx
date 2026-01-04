import { Routes, Route, Navigate } from "react-router-dom";
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
import AboutUs from "../Pages/AboutUs/AboutUs";
import ContactUs from "../Pages/ContactUs/ContactUs";
import OurProducts from "../Pages/OurProducts/OurProducts";
import RationPage from "../Pages/Farmer/Ration/RationPage";
import MixPrecisionPage from "../Pages/Farmer/Ration/MixPrecisionPage";
import MilkingProductionGroups from "../Pages/Farmer/MilkProduction/MilkingProductionGroups";
import ProductionShift from "../Pages/Farmer/MilkProduction/ProductionShift";
import MilkingAnimalList from "../Pages/Farmer/MilkProduction/MilkingAnimalList";
import MilkProductionPage from "../Pages/Farmer/MilkProduction/MilkProductionPage";
import LeftoverPage from "../Pages/Farmer/Leftover/LeftoverPage";
import ReportsPage from "../Pages/Farmer/Reports/ReportsPage";
import MilkYieldMenu from "../Pages/Farmer/Reports/MilkYield/MilkYieldMenu";
import CowWiseMilkYield from "../Pages/Farmer/Reports/MilkYield/CowWiseMilkYield";
import GroupWiseMilkYield from "../Pages/Farmer/Reports/MilkYield/GroupWiseMilkYield";
import DailyFeedEfficiency from "../Pages/Farmer/Reports/DailyFeedEfficiency";
import DryMatterIntake from "../Pages/Farmer/Reports/DryMatterIntake";
import AdminFarmerView from "../Pages/Admin/AdminFarmerView";
import AdminRationGroups from "../Pages/Admin/AdminRationGroups";
import AdminRationDetails from "../Pages/Admin/AdminRationDetails";
import FarmerLeftoverGroup from "../Pages/Farmer/Leftover/FarmerLeftoverGroup";
import FarmerRationGroup from "../Pages/Farmer/Ration/FarmerRationGroup";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/about-us" replace />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/our-products" element={<OurProducts />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ADMIN ROUTES */}
      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>
      <Route path="/admin/farmer/:id" element={<AdminFarmerView />} />
      <Route path="/admin/ration" element={<AdminRationGroups />} />
      <Route path="/admin/ration/:groupId" element={<AdminRationDetails />} />

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
      <Route
        path="/farmer/ration/:groupId/mix"
        element={<MixPrecisionPage />}
      />
      <Route path="/farmer/milk" element={<MilkingProductionGroups />} />
      <Route path="/farmer/milk/:groupId/shift" element={<ProductionShift />} />
      <Route
        path="/farmer/milk/:groupId/animals"
        element={<MilkingAnimalList />}
      />
      <Route
        path="/farmer/milk/:groupId/produce"
        element={<MilkProductionPage />}
      />
      <Route path="/farmer/leftover" element={<FarmerLeftoverGroup />} />
      <Route path="/farmer/leftover/:groupId" element={<LeftoverPage />} />

      <Route path="/farmer/ration" element={<FarmerRationGroup />} />
      <Route path="/farmer/ration/:groupId" element={<RationPage />} />

      <Route path="/farmer/reports" element={<ReportsPage />} />

      <Route path="/farmer/reports/milk-yield" element={<MilkYieldMenu />} />
      <Route
        path="/farmer/reports/milk-yield/cow-wise"
        element={<CowWiseMilkYield />}
      />
      <Route
        path="/farmer/reports/milk-yield/group-wise"
        element={<GroupWiseMilkYield />}
      />

      <Route
        path="/farmer/reports/daily-feed-efficiency"
        element={<DailyFeedEfficiency />}
      />
      <Route
        path="/farmer/reports/dry-matter-intake"
        element={<DryMatterIntake />}
      />
    </Routes>
  );
}
