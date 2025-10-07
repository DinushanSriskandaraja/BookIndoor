"use client";
import { useEffect, useState } from "react";
import GroundCard from "@/components/GroundCard";

export default function UserPage() {
  const [grounds, setGrounds] = useState<any[]>([]);

  useEffect(() => {
    const defaultGrounds = [
      {
        id: 1,
        name: "Arena Hub",
        location: "Colombo",
        image: "/arena.jpg",
        sports: ["Badminton", "Futsal"],
      },
      {
        id: 2,
        name: "Indoor Sports Hub",
        location: "Kandy",
        image: "/hub.jpg",
        sports: ["Basketball", "Volleyball"],
      },
    ];

    const stored = JSON.parse(localStorage.getItem("grounds") || "[]");
    setGrounds([...defaultGrounds, ...stored]);
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
            className="w-full bg-green-100/20 backdrop-blur-md border border-green-700/30 rounded-2xl shadow-lg overflow-hidden transition hover:scale-105 hover:shadow-2xl"
          >
            <GroundCard ground={g} />
          </div>
        ))}
      </div>
    </section>
  );
}
