"use client";

import GroundCard from "@/components/GroundCard"; // adjust path if needed
import { useState } from "react";
import Link from "next/link";

// Mock data for grounds
const mockGrounds = [
  {
    id: 1,
    name: "Indoor Arena",
    location: "Colombo",
    image: "/arena1.jpg",
    sports: ["Badminton", "Futsal", "Basketball"],
  },
  {
    id: 2,
    name: "City Sports Hall",
    location: "Kandy",
    image: "/arena2.jpg",
    sports: ["Volleyball", "Badminton"],
  },
  {
    id: 3,
    name: "Beachside Courts",
    location: "Galle",
    image: "/arena3.jpg",
    sports: ["Futsal", "Basketball"],
  },
];

export default function AdminPage() {
  const [role] = useState<"Admin" | "User">("Admin"); // mock user role

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        {role === "Admin" && (
          <Link
            href="/admin/add-ground"
            className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Add New Ground
          </Link>
        )}
      </div>

      {/* Grounds Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockGrounds.map((ground) => (
          <GroundCard key={ground.id} ground={ground} role={role} />
        ))}
      </div>
    </div>
  );
}
