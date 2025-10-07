"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login", { email, password });
    router.push("/"); // redirect to home after login
  };

  return (
    <div className="flex items-center justify-center w-96 min-h-screen px-4 bg-green-50/20 backdrop-blur-sm">
      <div className="bg-green-100/20 backdrop-blur-md border border-green-700/30 shadow-lg rounded-2xl p-8 sm:p-10 w-full max-w-md mx-2">
        {/* Logo / Branding */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-900">Login</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
          {/* Email Input */}
          <div className="relative">
            <EnvelopeIcon className="w-5 h-5 text-green-700 absolute left-3 top-3.5" />
            <input
              type="email"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 border border-green-400 rounded-xl bg-white/50 backdrop-blur-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <LockClosedIcon className="w-5 h-5 text-green-700 absolute left-3 top-3.5" />
            <input
              type="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 border border-green-400 rounded-xl bg-white/50 backdrop-blur-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 transition"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-green-700 text-white rounded-xl font-semibold hover:bg-green-800 transition shadow-md"
          >
            Login
          </button>
        </form>

        {/* Extra Links */}
        <div className="text-center mt-4 sm:mt-6">
          <p className="text-green-900 text-sm sm:text-base">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-green-700 font-medium hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
