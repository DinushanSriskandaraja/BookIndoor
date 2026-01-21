"use client";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 px-6 overflow-hidden bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-emerald-50 rounded-full blur-[100px] opacity-60" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-50 rounded-full blur-[100px] opacity-60" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
            The Experience
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 font-outfit tracking-tight">
            Elevate Your <br className="md:hidden" />
            <span className="text-emerald-600">Game Experience</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-500 leading-relaxed font-medium">
            BookIndoor is the premier platform for professional-grade indoor sports arenas.
            We bridge the gap between passion and performance, offering seamless access to
            the city&apos;s most exclusive futsal, badminton, and basketball venues.
            <span className="block mt-4 text-emerald-700 font-bold">Play smarter, compete harder.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
