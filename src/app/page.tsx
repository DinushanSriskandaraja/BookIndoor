"use client";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import GroundsCarousel from "@/components/GroundsCarousel";

export default function HomePage() {
  return (
    <main className="w-full overflow-x-hidden text-white bg-white">
      {/* Hero */}
      <HeroSection />

      {/* About */}
      <AboutSection />

      {/* Stats */}
      <StatsSection />

      {/* Auto-scrolling Grounds */}
      <GroundsCarousel />

      
    </main>
  );
}
