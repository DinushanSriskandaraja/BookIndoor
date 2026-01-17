"use client";

import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./LoginForm";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const [role, setRole] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

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
    <header className="glass-header sticky top-0 z-50 w-full transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between px-6 sm:px-10 py-5">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center group">
          <img
            src="/images/BookindoorLogo.png"
            alt="BookIndoor Logo"
            className="h-14 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* User or Logout button */}
        <div className="flex items-center gap-6">
          {(role === "admin" || role === "superadmin") ? (
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-slate-900 text-white font-semibold rounded-full hover:bg-slate-800 transition-all duration-300 shadow-md active:scale-95"
            >
              <Link href="/user">
                Logout
              </Link>

            </button>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/user" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors hidden sm:block">
                Explore Grounds
              </Link>
              <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center justify-center w-11 h-11 bg-slate-100 rounded-full hover:bg-emerald-50 transition-all duration-300 group cursor-pointer"
              >
                <UserIcon className="w-6 h-6 text-slate-600 group-hover:text-emerald-600 transition-colors" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLoginModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100"
            >
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-400 rounded-2xl transition-all"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
              <LoginForm onSuccess={() => setShowLoginModal(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
