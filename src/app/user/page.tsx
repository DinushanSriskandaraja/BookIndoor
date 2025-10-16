"use client";
import { useEffect, useState, useMemo } from "react";
import GroundCard, { Ground } from "@/components/GroundCard";
import GroundFilter from "@/components/GroundFilter";

function GroundBanner({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % images.length),
      3000
    );
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] overflow-hidden shadow-xl">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Ground ${index}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-transform duration-1000 ease-in-out ${
            index === current
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
    </div>
  );
}

export default function UserPage() {
  const [grounds, setGrounds] = useState<Ground[]>([]);
  const [filters, setFilters] = useState({
    name: "",
    location: "",
    sport: "",
  });

  useEffect(() => {
    const fetchGrounds = async () => {
      try {
        const response = await fetch("/api/grounds");
        if (!response.ok) throw new Error("Failed to fetch grounds");
        const data = await response.json();

        const mappedGrounds: Ground[] = data.map((g: any) => ({
          id: g._id,
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

  const availableSports = useMemo(() => {
    const sportsSet = new Set<string>();
    grounds.forEach((g) => g.sports?.forEach((s) => sportsSet.add(s)));
    return Array.from(sportsSet);
  }, [grounds]);

  // ✅ Filter logic
  const filteredGrounds = useMemo(() => {
    return grounds.filter((g) => {
      const matchesName = g.name
        .toLowerCase()
        .includes(filters.name.toLowerCase());
      const matchesLocation = g.location
        .toLowerCase()
        .includes(filters.location.toLowerCase());
      const matchesSport =
        filters.sport === "" || (g.sports && g.sports.includes(filters.sport));
      return matchesName && matchesLocation && matchesSport;
    });
  }, [grounds, filters]);

  const bannerImages = grounds.map((g) => g.image);

  return (
    <div className="min-h-screen w-full bg-white text-gray-900 flex flex-col overflow-x-hidden">
      {bannerImages.length > 0 && <GroundBanner images={bannerImages} />}

      <section className="w-full max-w-[1600px] mx-auto flex-1 px-4 sm:px-8 py-16">
        <h1 className="text-4xl sm:text-5xl text-center font-extrabold">
          Explore Our Grounds
        </h1>
        <p className="text-lg sm:text-xl mb-8 text-center text-green-600 mt-2">
          Book your perfect spot today!
        </p>

        {/* ✅ Add GroundFilter component */}
        <GroundFilter
          onFilterChange={(f) => setFilters(f)}
          availableSports={availableSports}
        />

        {/* ✅ Grounds Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {filteredGrounds.length > 0 ? (
            filteredGrounds.map((g) => (
              <GroundCard key={g.id} ground={g} role={"User"} id={0} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg">
              No grounds found matching your filters.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
