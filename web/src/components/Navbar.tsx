"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { href: "/herdInfo", label: "Herd Info" },
  { href: "/milking-groups", label: "Milking Groups" },
  { href: "/rations", label: "Ration" },
  { href: "/leftover", label: "Leftover" },
  { href: "/reports", label: "Reports" },
];

export default function Navbar() {
  const { logout, user } = useAuth();
  const pathname = usePathname();

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow">
      <div className="font-bold text-lg">Elite Dairymen Admin</div>

      <div className="flex items-center gap-4">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1 rounded-full text-sm font-semibold transition
                ${active ? "bg-white text-blue-700" : "hover:bg-blue-500"}`}
            >
              {item.label}
            </Link>
          );
        })}

        {user && (
          <button
            onClick={logout}
            className="ml-4 bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full text-sm font-semibold"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
