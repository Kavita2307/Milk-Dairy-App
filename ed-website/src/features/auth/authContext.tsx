import { createContext, useState } from "react";
import type { AuthContextType, UserRole } from "./auth.types";

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>(null);

  return (
    <AuthContext.Provider
      value={{
        role,
        login: setRole,
        logout: () => setRole(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export { AuthContext };
