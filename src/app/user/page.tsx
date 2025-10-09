"use client";
import { useEffect, useState } from "react";
import GroundCard, { Ground } from "@/components/GroundCard";

export default function UserPage() {
  const [grounds, setGrounds] = useState<any[]>([]);

  useEffect(() => {
    const fetchGrounds = async () => {
      try {
        const token = localStorage.getItem("token");

        // Call the backend API with token
        const response = await fetch("/api/grounds", {
          headers: {
            "Content-Type": "application/json",
            // ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (!response.ok) throw new Error("Failed to fetch grounds");

        const data = await response.json();

        // Normalize backend response to match Ground interface
        const mappedGrounds: Ground[] = data.map((g: any) => ({
          id: g._id, // _id → id
          name: g.name,
          location:
            typeof g.location === "string"
              ? g.location
              : g.location?.address || "Unknown",
          image: g.images?.[0] || "/placeholder.png",
          sports: g.sports?.map((s: any) => s.name) || [],
        }));

        setGrounds(mappedGrounds);
      } catch (err) {
        console.error("❌ Error fetching grounds:", err);
      }
    };

    fetchGrounds();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold mb-10 text-center text-green-100 drop-shadow-lg">
        Available Grounds
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
        {grounds.map((g) => (
          <div
            key={g.id}
            className="w-full bg-green-100/20 backdrop-blur-md border border-green-700/30 rounded-2xl shadow-lg overflow-hidden transition hover:scale-105 hover:shadow-2xl">
            <GroundCard key={g.id} ground={g} role={"User"} id={0} />
          </div>
        ))}
      </div>
    </section>
  );
}
function setStats(arg0: {
  totalAdmins: any;
  totalGrounds: any;
  totalRevenue: any;
  activeBookings: any;
}) {
  throw new Error("Function not implemented.");
}
