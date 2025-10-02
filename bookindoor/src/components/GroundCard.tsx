// GroundCard.tsx
import Link from "next/link";

export interface Ground {
  id: number;
  name: string;
  location: string;
  image: string;
  sports?: string[];
}

interface GroundCardProps {
  ground: Ground;
  role?: "Admin" | "User"; // <-- Add role here
}

export default function GroundCard({ ground, role = "User" }: GroundCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={ground.image}
          alt={ground.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-white text-lg font-semibold">{ground.name}</h3>
          <p className="text-gray-200 text-sm flex items-center gap-1">📍 {ground.location}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {ground.sports && ground.sports.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {ground.sports.map((sport) => (
              <span
                key={sport}
                className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full font-medium"
              >
                {sport}
              </span>
            ))}
          </div>
        )}

        <Link
          href={`/user/ground/${ground.id}`}
          className="mt-2 inline-block w-full text-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
        >
          View Details
        </Link>

        
      </div>
    </div>
  );
}
