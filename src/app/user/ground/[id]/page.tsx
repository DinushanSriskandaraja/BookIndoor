"use client";

import { useParams } from "next/navigation";
import { useState, JSX } from "react";
import {
  WifiIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  TruckIcon,
  HomeIcon,
  MapPinIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import Calendar from "@/components/Calendar";

interface Ground {
  id: string;
  name: string;
  location: string;
  sports: { name: string; price: number }[];
  facilities: string[];
  images: string[];
}

const mockGround: Ground = {
  id: "1",
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

const mockBookedSlots: Record<string, string[]> = {
  Badminton: ["2025-10-02 09:00", "2025-10-02 12:00"],
  Futsal: ["2025-10-02 11:00", "2025-10-02 16:00"],
  Basketball: ["2025-10-03 14:00"],
};

const facilityIcons: Record<string, JSX.Element> = {
  "Locker Room": <UserGroupIcon className="w-5 h-5 text-green-500" />,
  Parking: <TruckIcon className="w-5 h-5 text-green-500" />,
  Cafeteria: <ShoppingBagIcon className="w-5 h-5 text-green-500" />,
  "Wi-Fi": <WifiIcon className="w-5 h-5 text-green-500" />,
};

export default function UserGroundDetails() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!id)
    return <p className="text-center mt-10 text-red-500">Invalid ground ID</p>;

  const ground = mockGround;
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"calendar" | "summary" | "details">(
    "calendar"
  );

  const prevImage = () =>
    setCurrentImage((prev) =>
      prev === 0 ? ground.images.length - 1 : prev - 1
    );
  const nextImage = () =>
    setCurrentImage((prev) =>
      prev === ground.images.length - 1 ? 0 : prev + 1
    );

  const glassCardClasses =
    "bg-green-100/20 backdrop-blur-md border border-green-700/30 rounded-2xl shadow-lg p-6";

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      {/* Image Carousel */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <img
          src={ground.images[currentImage]}
          alt={ground.name}
          className="w-full h-80 sm:h-[28rem] object-cover transition-all duration-500"
        />
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:scale-105 transition"
        >
          ◀
        </button>
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:scale-105 transition"
        >
          ▶
        </button>
      </div>

      {/* Ground Info */}
      <div className={glassCardClasses + " flex flex-col sm:flex-row justify-between gap-6"}>
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            {ground.name} <StarIcon className="w-6 h-6 text-yellow-400" />
          </h1>
          <p className="text-green-200 mt-2 flex items-center gap-2">
            <MapPinIcon className="w-5 h-5 text-green-400" />
            {ground.location}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                ground.location
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-300 hover:underline text-sm ml-2"
            >
              View on Map
            </a>
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {ground.facilities.map((facility) => (
              <span
                key={facility}
                className="px-4 py-2 bg-green-800 text-white rounded-full text-sm font-medium flex items-center gap-1"
              >
                {facilityIcons[facility] || <HomeIcon className="w-5 h-5 text-green-500" />}
                {facility}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Sports Selection */}
      <div className={glassCardClasses}>
        <h2 className="text-xl font-semibold text-white mb-4">
          Select a Sport to Book
        </h2>
        <div className="flex flex-wrap gap-4">
          {ground.sports.map((sport) => (
            <button
              key={sport.name}
              onClick={() => setSelectedSport(sport.name)}
              className={`px-5 py-3 rounded-xl border font-semibold transition ${
                selectedSport === sport.name
                  ? "bg-green-600 text-white border-green-600 scale-105"
                  : "bg-white text-green-900 border-green-600 hover:bg-green-100 hover:text-green-900"
              }`}
            >
              {sport.name} – Rs {sport.price}
            </button>
          ))}
        </div>
      </div>

      {/* Booking Tabs */}
      {selectedSport && (
        <div className={glassCardClasses}>
          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-green-700 pb-2 justify-center">
            {[
              { key: "calendar", label: "Booking Calendar" },
             
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() =>
                  setActiveTab(tab.key as "calendar")
                }
                className={`px-4 py-2 rounded-t-lg font-medium transition ${
                  activeTab === tab.key
                    ? "text-green-900 border-b-2 border-green-600"
                    : "text-green-700 hover:text-green-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="transition-all duration-300">
            {activeTab === "calendar" && (
              <Calendar
                bookedSlots={mockBookedSlots[selectedSport] || []}
                groundName={`${ground.name} - ${selectedSport}`}
              />
            )}
            
          </div>
        </div>
      )}
    </div>
  );
}
