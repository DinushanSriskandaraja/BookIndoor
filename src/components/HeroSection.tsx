"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const IMAGES = [
  "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1920&q=80", // basketball indoor
  "https://images.unsplash.com/photo-1600185365225-4d8c2d1e6a56?auto=format&fit=crop&w=1920&q=80", // badminton court
  "https://images.unsplash.com/photo-1587085128535-cc04f1d1d9b6?auto=format&fit=crop&w=1920&q=80", // multi-sport indoor
  "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1920&q=80", // indoor football/turf
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[85vh] lg:min-h-screen flex items-center overflow-hidden bg-slate-950">
      {/* Background Slideshow with Premium Depth */}
      <div className="absolute inset-0">
        {IMAGES.map((img, index) => (
          <motion.div
            key={img}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{
              opacity: index === current ? 1 : 0,
              scale: index === current ? 1.05 : 1.15
            }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          >
            <Image
              src={img}
              alt="Premium Arena"
              fill
              className="object-cover brightness-[0.45] contrast-[1.1]"
              priority={index === 0}
              quality={90}
            />
          </motion.div>
        ))}
        {/* Architectural Overlays - Centered Focus */}
        <div className="absolute inset-0 bg-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950/80" />
      </div>

      <div className="container mx-auto px-6 sm:px-12 lg:px-20 relative z-10 w-full flex flex-col items-center text-center">
        <div className="max-w-5xl flex flex-col items-center">
          {/* Discovery Badge */}


          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            {/* Heading with Layered Impact - Centered */}
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-extrabold text-white leading-[0.85] font-outfit tracking-tighter mb-8 drop-shadow-2xl">
              Master Your <br />
              <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-300 bg-clip-text text-transparent italic px-4">
                Indoor Game
              </span>
            </h1>

            {/* Premium Text Context */}
            <p className="text-xs md:text-xl text-emerald-50/90 mb-12 leading-relaxed max-w-3xl font-medium tracking-wide drop-shadow-md">
              Experience exclusive access to the city's finest private arenas.
              Discover, book, and compete in the ultimate professional settings with ease.
            </p>

            {/* Centered Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
              <Link
                href="/user"
                className="group relative w-full sm:w-auto px-16 py-6 text-2xl font-black text-slate-950 rounded-2xl bg-emerald-400 hover:bg-emerald-300 transition-all duration-300 hover:scale-[1.05] active:scale-95 text-center shadow-[0_20px_50px_-10px_rgba(16,185,129,0.5)]"
              >
                Start Your Game
              </Link>
              <Link
                href="#about"
                className="w-full sm:w-auto px-12 py-6 rounded-2xl font-bold text-lg text-white border border-white/20 bg-white/5 hover:bg-white/10 transition-all backdrop-blur-md text-center"
              >
                Learn More
              </Link>
            </div>

            {/* Scroll Discovery - Now under buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="mt-16 flex flex-col items-center gap-3"
            >
              <span className="text-[10px] uppercase font-bold text-white/40 tracking-[0.4em]">Scroll to Explore</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-px h-10 bg-gradient-to-b from-emerald-500/80 to-transparent"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
