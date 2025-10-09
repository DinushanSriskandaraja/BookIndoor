"use client";

import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export default function Header() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    setRole(userRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    window.location.href = "/login";
  };

  return (
    <header className="bg-green-700 shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <span className="text-2xl font-bold text-white tracking-wide">
          BookIndoor
        </span>

        <div className="flex items-center gap-4">
          {(role === "admin" || role === "superadmin") ? (
            <button
              onClick={handleLogout}
              className="bg-white text-green-700 font-semibold px-4 py-2 rounded-md hover:bg-green-100 transition duration-200"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <UserIcon className="w-8 h-8 text-white hover:text-green-200 cursor-pointer transition duration-200" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
