"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../src/lib/api";
import { useAuth } from "../../src/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data.user, res.data.token);
      router.push("/herdInfo");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg w-96 shadow">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">
          Login
        </h2>

        <input
          className="w-full p-2 border rounded mb-3 placeholder:text-gray-500 text-black"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded mb-4 placeholder:text-gray-500 text-black"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          Login
        </button>

        <p className="text-center mt-4 text-gray-700">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => router.push("/signup")}
            className="text-blue-600 cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
