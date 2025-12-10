"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-700 to-emerald-500 text-white">
      <h1 className="text-4xl font-bold mb-4">Elite Dairymen</h1>
      <p className="mb-8 text-lg">Smart Dairy Management System</p>

      <button
        onClick={() => router.push("/login")}
        className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold"
      >
        Login
      </button>
    </main>
  );
}
