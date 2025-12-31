// export type UserRole = "farmer" | "official" | null;

// export interface AuthContextType {
//   role: UserRole;
//   login: (role: UserRole) => void;
//   logout: () => void;
// }
export type User = {
  id: number;
  name: string;
  email: string | null;
  role: "farmer" | "admin";
};

export type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => Promise<void>;
};
