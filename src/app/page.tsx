"use client";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import GroundsCarousel from "@/components/GroundsCarousel";
import CTASection from "@/components/CTASection";
// import TermsSection from "@/components/TermsAndConditions";

export default function HomePage() {
  return (
    <main className="w-full overflow-x-hidden text-white bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* About / Features */}
      <AboutSection />

      {/* Stats / Numbers */}
      <StatsSection />

      {/* Auto-scrolling Grounds Carousel */}
      <GroundsCarousel />

      

      {/* Call To Action */}
      <CTASection />

      {/* <TermsSection /> */}

    
    </main>
  );
}
