"use client";

import { useParams, useRouter } from "next/navigation";
import { JSX, useState } from "react";
import Calendar from "@/components/Calendar";
import { WifiIcon, UserGroupIcon, ShoppingBagIcon, TruckIcon, HomeIcon } from "@heroicons/react/24/solid";

interface Ground {
  id: string;
  name: string;
  location: string;
  sports: { name: string; price: number }[];
  facilities: string[];
  images: string[];
}

// Mock booked slots per sport
const mockBookedSlots: Record<string, string[]> = {
  Badminton: ["2025-10-02 09:00", "2025-10-02 12:00"],
  Futsal: ["2025-10-02 11:00", "2025-10-02 16:00"],
  Basketball: ["2025-10-03 14:00"],
};

// Map facility names to icons
const facilityIcons: Record<string, JSX.Element> = {
  "Locker Room": <UserGroupIcon className="w-5 h-5 text-gray-700" />,
  Parking: <TruckIcon className="w-5 h-5 text-gray-700" />,
  Cafeteria: <ShoppingBagIcon className="w-5 h-5 text-gray-700" />,
  "Wi-Fi": <WifiIcon className="w-5 h-5 text-gray-700" />,
};

export default function GroundDetails() {
  const params = useParams();
  const router = useRouter();

  // Ensure id is a string
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  if (!id) return <p className="text-center mt-10 text-red-500">Invalid ground ID</p>;

  const ground: Ground = {
    id,
    name: "Indoor Arena",
    location: "Colombo",
    sports: [
      { name: "Badminton", price: 1000 },
      { name: "Futsal", price: 2000 },
      { name: "Basketball", price: 2500 },
    ],
    facilities: ["Locker Room", "Parking", "Cafeteria", "Wi-Fi"],
    images: ["/arena1.jpg", "/arena2.jpg", "/arena3.jpg"],
  };

  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState(0);

  const prevImage = () =>
    setCurrentImage((prev) => (prev === 0 ? ground.images.length - 1 : prev - 1));
  const nextImage = () =>
    setCurrentImage((prev) => (prev === ground.images.length - 1 ? 0 : prev + 1));

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header + Image Carousel */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image Carousel */}
          <div className="relative w-full md:w-1/2">
            <img
              src={ground.images[currentImage]}
              alt={ground.name}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
            >
              ◀
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
            >
              ▶
            </button>
          </div>

          {/* Ground Info + Facilities */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{ground.name}</h1>
              <p className="text-gray-500 mt-1 flex items-center gap-2">
                {ground.location}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    ground.location
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Location
                </a>
              </p>

              {/* Facilities */}
              <div className="flex flex-wrap gap-4 mt-3">
                {ground.facilities.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {facilityIcons[f] || <HomeIcon className="w-5 h-5 text-gray-700" />}
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-2">
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-medium text-sm">
                  Popular
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium text-sm">
                  Indoor
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sports Selection */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Select a Sport</h2>
        <div className="flex flex-wrap gap-4">
          {ground.sports.map((s) => (
            <button
              key={s.name}
              onClick={() => setSelectedSport(s.name)}
              className={`px-4 py-2 rounded-lg border font-medium ${
                selectedSport === s.name
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              }`}
            >
              {s.name} - Rs {s.price}
            </button>
          ))}
        </div>
      </div>

      {/* Booking Calendar */}
      {selectedSport && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Booking Calendar - {selectedSport}
          </h2>
          <Calendar bookedSlots={mockBookedSlots[selectedSport] || []} />
        </div>
      )}

      {/* Confirm Booking Button */}
      {selectedSport && (
        <div className="text-center">
          <button
            onClick={() => router.push(`/user/booking/payment`)}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
}
