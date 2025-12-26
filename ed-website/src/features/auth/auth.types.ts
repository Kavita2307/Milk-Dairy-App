export type UserRole = "farmer" | "official" | null;

export interface AuthContextType {
  role: UserRole;
  login: (role: UserRole) => void;
  logout: () => void;
}
