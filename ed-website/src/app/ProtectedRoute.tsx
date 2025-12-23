import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/auth.hooks";

export const ProtectedRoute = ({ role }: { role: string }) => {
  const auth = useAuth();
  return auth.role === role ? (
    <Outlet />
  ) : (
    <Navigate to="/animal-nutrition/login" />
  );
};
