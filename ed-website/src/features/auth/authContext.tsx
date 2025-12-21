import { createContext, useContext, useState } from "react";

type Role = "farmer" | "official" | null;

interface AuthContextType {
  role: Role;
  login: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<Role>(null);

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
};

export const useAuth = () => useContext(AuthContext);
