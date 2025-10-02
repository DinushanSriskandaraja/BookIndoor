import GroundCard from "@/components/GroundCard";

export default function UserPage() {
  const grounds = [
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

  return (
    <section>
      <h2 className="text-3xl font-semibold mb-8 text-indigo-600">
        Available Grounds
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {grounds.map((g) => (
          <GroundCard key={g.id} ground={g} />
        ))}
      </div>
    </section>
  );
}
