"use client";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="relative py-20 px-8 bg-gradient-to-br from-emerald-50 to-white overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-white to-emerald-50 opacity-80" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-200/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-200/20 rounded-full blur-[120px] animate-pulse" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 font-outfit tracking-tight leading-tight">
            Ready to <span className="text-emerald-600">Dominate</span> <br className="hidden md:block" />
            the Indoor Court?
          </h2>
          <p className="text-slate-500 mb-12 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Join the elite community of players booking the city's finest arenas.
            Your next champion moment starts with a single click.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="/user"
              className="btn-premium px-12 py-5 text-lg shadow-[0_20px_50px_rgba(16,185,129,0.2)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.4)]"
            >
              Secure Your Slot Now
            </a>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-[0.2em]">
              Instant Confirmation
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
