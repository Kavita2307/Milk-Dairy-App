import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../api/api";

type User = {
  id: number;
  name: string;
  mobile: string;
  email?: string;
  address?: string;
  pincode?: string;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    password: string,
    name: string,
    mobile: string,
    email?: string
  ) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("token");
      const userStr = await AsyncStorage.getItem("user");
      console.log("TOKEN:", token);
      console.log("USER:", userStr);

      if (token && userStr) {
        setUser(JSON.parse(userStr));
      }
      setLoading(false);
    })();
  }, []);

  const login = async (username: string, password: string) => {
    console.log("inside login of auth context");
    console.log("login called with:", username, password);
    const res = await API.post("/auth/login", { username, password });
    await AsyncStorage.setItem("token", res.data.token);
    await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
    setUser(res.data.user);
  };

  const register = async (
    name: string,
    mobile: string,
    password: string,
    email?: string
  ) => {
    const res = await API.post("/auth/register", {
      name,
      mobile,
      password,
      email,
    });
    // await AsyncStorage.setItem("token", res.data.token);
    // await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
    // setUser(res.data.user);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
