"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPinIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export interface Ground {
  _id: string;
  name: string;
  location: string;
  image: string;
  sports?: string[];
  facilities?: string[];
}

interface GroundCardProps {
  id?: number;
  ground: Ground;
  role?: "admin" | "user" | "super_admin";
}

export default function GroundCard({ ground }: GroundCardProps) {
  const link = `/user/ground/${ground._id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card overflow-hidden w-full max-w-[400px] flex flex-col group h-full"
    >
      {/* Image Container */}
      <div className="relative w-full h-40 sm:h-60 overflow-hidden">
        <Image
          src={ground.image}
          alt={ground.name}
          fill
          className="object-cover transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 400px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 transition-opacity" />

      </div>

      {/* Content Area */}
      <div className="p-3 sm:p-6 flex-1 flex flex-col space-y-2 sm:space-y-4">
        <div>
          <h3 className="text-base sm:text-xl font-bold text-slate-900 font-outfit mb-0.5 sm:mb-1 transition-colors truncate">
            {ground.name}
          </h3>
          <p className="text-slate-400 text-[10px] sm:text-sm flex items-center gap-1 sm:gap-1.5 font-medium truncate">
            <MapPinIcon className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
            {ground.location}
          </p>
        </div>

        {/* Available Sports Section - New Location */}
        {ground.sports && ground.sports.length > 0 && (
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {ground.sports.slice(0, 2).map((sport) => (
              <span
                key={sport}
                className="text-[8px] sm:text-[10px] uppercase tracking-wider font-bold bg-emerald-100 text-emerald-800 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full whitespace-nowrap"
              >
                {sport}
              </span>
            ))}
            {ground.sports.length > 2 && (
              <span className="text-[8px] sm:text-[10px] text-slate-400 font-bold self-center">
                +{ground.sports.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Facilities (Limited) */}
        {ground.facilities && ground.facilities.length > 0 && (
          <div className="hidden sm:flex flex-wrap gap-2">
            {ground.facilities.slice(0, 3).map((facility) => (
              <span
                key={facility}
                className="text-[11px] font-semibold bg-slate-50 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-100 flex items-center gap-1.5"
              >
                {facility === "Wi-Fi" && <span className="text-[10px]">📶</span>}
                {facility === "Parking" && <span className="text-[10px]">🅿️</span>}
                {facility === "Cafeteria" && <span className="text-[10px]">☕</span>}
                {facility}
              </span>
            ))}
          </div>
        )}

        <div className="pt-2 sm:pt-4 mt-auto">
          <Link
            href={link}
            className="w-full h-8 sm:h-12 btn-premium flex items-center justify-center gap-1 sm:gap-2 group/btn !px-2 sm:!px-4"
          >
            <span className="!text-white text-[10px] sm:text-sm font-black uppercase tracking-widest">
              View
            </span>
            <ArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4 !text-white group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
