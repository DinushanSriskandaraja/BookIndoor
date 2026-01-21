"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

interface LoginFormProps {
    onSuccess?: () => void;
    onClose?: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Login failed");
                setLoading(false);
                return;
            }

            // ✅ Save token and user info
            localStorage.setItem("token", data.token);
            localStorage.setItem("userRole", data.user.role);
            localStorage.setItem("userId", data.user._id);
            localStorage.setItem("user", data.user.role); // Backward compatibility
            localStorage.setItem("id", data.user._id); // Backward compatibility

            if (onSuccess) {
                onSuccess();
            }

            // ✅ Redirect based on role
            if (data.user.role === "admin") {
                router.push("/admin");
            } else if (data.user.role === "super_admin") {
                router.push("/superadmin");
            } else {
                router.push("/");
                if (!onSuccess) window.location.reload();
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-slate-800 tracking-tight">Admin Access</h2>
                <p className="text-slate-500 text-sm font-medium mt-1">Please sign in to manage your facility</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Email Address</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                            <EnvelopeIcon className="w-5 h-5" />
                        </div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 placeholder:text-slate-300 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium"
                            placeholder="Enter your email"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Password</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                            <LockClosedIcon className="w-5 h-5" />
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 placeholder:text-slate-300 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium"
                            placeholder="Enter your password"
                        />
                    </div>
                </div>

                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs font-bold text-center bg-red-50 py-2 rounded-lg border border-red-100"
                    >
                        {error}
                    </motion.p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                    {loading ? "Authenticating..." : "Sign In"}
                </button>
            </form>
        </div>
    );
}
