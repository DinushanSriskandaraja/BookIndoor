"use client";

import { useState } from "react";
import SuperAdminSummaryTab from "../../components/SuperAdminSummaryTab";
import AdminTab from "../../components/AdminTab";

export default function SuperAdminLandingPage() {
  const [activeTab, setActiveTab] = useState<"summary" | "admins">("summary");

  const handleLogout = () => {
    // ✅ Clear stored session data
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("role");
    // ✅ Redirect to login page
    window.location.href = "/login";
  };

  return (
    <div className="justify-center bg-gray-50 min-h-screen">
      <div className="w-full px-4 sm:px-6 py-10 bg-white shadow-sm rounded-xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              Super Admin Control
            </h1>
            <p className="text-slate-500 mt-1 font-medium">Global platform oversight and administrative management</p>
          </div>

          {/* ✅ Logout Button */}
          <button
            onClick={handleLogout}
            className="px-5 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-100 active:scale-95"
          >
            Terminal Logout
          </button>
        </div>

        {/* Tabs Navigation */}
        <div className="flex gap-4 mb-8 border-b border-slate-100 pb-2 overflow-x-auto">
          {[
            { key: "summary", label: "Financial Summary" },
            { key: "admins", label: "Administrator Network" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as "summary" | "admins")}
              className={`px-4 py-3 rounded-t-xl font-bold transition-all duration-200 whitespace-nowrap
                ${activeTab === tab.key
                  ? "text-emerald-600 border-b-4 border-emerald-600"
                  : "text-slate-400 hover:text-emerald-500"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px] transition-all duration-300">
          {activeTab === "summary" && <SuperAdminSummaryTab />}
          {activeTab === "admins" && <AdminTab />}
        </div>
      </div>
    </div>
  );
}
