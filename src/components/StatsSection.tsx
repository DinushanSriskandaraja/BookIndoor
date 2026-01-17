"use client";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { UserGroupIcon, TrophyIcon, HomeModernIcon } from "@heroicons/react/24/outline";

const stats = [
  { label: "Active Pro Players", value: 12000, icon: <UserGroupIcon className="w-5 h-5 md:w-8 h-8" /> },
  { label: "Elite Arenas", value: 250, icon: <HomeModernIcon className="w-5 h-5 md:w-8 h-8" /> },
  { label: "Games Completed", value: 30000, icon: <TrophyIcon className="w-5 h-5 md:w-8 h-8" /> },
];

export default function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="relative py-16 px-8 bg-slate-50 border-y border-slate-100 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-outfit mb-4">
            Our Thriving <span className="text-emerald-600">Community</span>
          </h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-3 gap-3 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="glass-card p-4 md:p-10 flex flex-col items-center text-center group transition-all duration-500 bg-white/80"
            >
              <div className="mb-3 md:mb-6 p-2 md:p-4 bg-emerald-50 text-emerald-600 rounded-xl md:rounded-2xl ">
                {stat.icon}
              </div>
              <h3 className="text-xl sm:text-2xl md:text-5xl font-black text-slate-900 mb-1 md:mb-3 font-outfit tracking-tighter">
                {inView ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={3}
                    separator=","
                    suffix={index !== 1 ? "+" : ""}
                  />
                ) : (
                  0
                )}
              </h3>
              <p className="text-slate-500 font-bold uppercase tracking-tight md:tracking-widest text-[8px] md:text-xs">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
