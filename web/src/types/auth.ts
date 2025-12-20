export type UserRole = "FARMER" | "OFFICIAL";

export interface LoginRequest {
  userId: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: UserRole;
  userId: string;
}
