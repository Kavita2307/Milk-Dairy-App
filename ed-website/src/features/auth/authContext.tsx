// import { createContext, useState } from "react";
// import type { AuthContextType, UserRole } from "./auth.types";

// const AuthContext = createContext<AuthContextType>(null!);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [role, setRole] = useState<UserRole>(null);

//   return (
//     <AuthContext.Provider
//       value={{
//         role,
//         login: setRole,
//         logout: () => setRole(null),
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }
// export { AuthContext };
import { createContext, useEffect, useState } from "react";
import { getUser, clearAuth } from "./auth.utils";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<unknown>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  // Load user from localStorage on refresh
  useEffect(() => {
    const storedUser = getUser();
    if (storedUser) setUser(storedUser);
  }, []);

  const logout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ed_token")}`,
        },
      });
    } catch {
      // even if server fails, still logout locally
    } finally {
      clearAuth();
      setUser(null);
      navigate("/");
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export { AuthContext };
