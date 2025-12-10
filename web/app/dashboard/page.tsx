"use client";

import Navbar from "@/src/components/Navbar";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  if (!user) return null;

  return (
    <>
      <Navbar />
      <main className="p-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
      </main>
    </>
  );
}
