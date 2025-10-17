"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Ground {
  id: string;
  name: string;
  images: string[];
}

export default function GroundsCarousel() {
  const [groundImages, setGroundImages] = useState<string[]>([]);

  // Fetch all grounds from backend
  useEffect(() => {
    const fetchGrounds = async () => {
      try {
        const res = await fetch("/api/grounds"); // your API endpoint
        if (!res.ok) throw new Error("Failed to fetch grounds");
        const data: Ground[] = await res.json();
        // Collect all images from all grounds
        const images = data.flatMap((ground) => ground.images);
        setGroundImages(images);
      } catch (err) {
        console.error(err);
      }
    };

    fetchGrounds();
  }, []);

  if (groundImages.length === 0)
    return (
      <section className="py-20 bg-white text-center text-green-100">
        <h2 className="text-3xl font-bold mb-10">Popular Indoor Grounds</h2>
        <p>Loading grounds...</p>
      </section>
    );

  return (
    <section className="py-20 bg-white overflow-hidden">
      <h2 className="text-center text-3xl font-bold text-green-100 mb-10">
        Popular Indoor Grounds
      </h2>

      <div className="relative flex overflow-x-hidden">
        <motion.div
          className="flex gap-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "linear",
          }}
        >
          {[...groundImages, ...groundImages].map((src, i) => (
            <div key={i} className="flex-shrink-0">
              <Image
                src={src}
                alt={`Ground ${i + 1}`}
                width={400}
                height={250}
                className="rounded-2xl shadow-lg object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
