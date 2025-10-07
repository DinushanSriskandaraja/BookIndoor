"use client";

import { useState } from "react";
import SuperAdminSummaryTab from "../../components/SuperAdminSummaryTab";
import AdminTab from "../../components/AdminTab";

export default function SuperAdminLandingPage() {
  const [activeTab, setActiveTab] = useState<"summary" | "admins">("summary");

  return (
    <div className="flex justify-center  py-10">
      {/* Full Width Container */}
      <div className="w-full max-w-9xl px-6 bg-white shadow-sm rounded-xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-green-800 p-6">
            Super Admin Dashboard
          </h1>
        </div>

        {/* Tabs Navigation (AdminPage Style) */}
        <div className="flex gap-4 mb-8 border-b border-gray-200 pb-2">
          {[
            { key: "summary", label: "Summary" },
            { key: "admins", label: "Admins" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as "summary" | "admins")}
              className={`px-4 py-2 rounded-t-lg font-medium transition-all duration-200
                ${
                  activeTab === tab.key
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-green-500 hover:text-green-600"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px] transition-all duration-300">
          {activeTab === "summary" && <SuperAdminSummaryTab />}
          {activeTab === "admins" && <AdminTab />}
        </div>
      </div>
    </div>
  );
}
