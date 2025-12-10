"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../src/lib/api";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await API.post("/auth/register", { email, password });
      alert("Account created, please login");
      router.push("/login");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-6 text-center text-black">
          Sign Up
        </h2>

        <input
          className="border p-2 w-full mb-3 placeholder:text-gray-500 text-black"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-4 placeholder:text-gray-500 text-black"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          Create Account
        </button>
        <p className="text-center mt-4 text-gray-700">
          You have already account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-600 cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}
