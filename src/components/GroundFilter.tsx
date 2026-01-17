"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  TrophyIcon,
  ChevronDownIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";

interface GroundFilterProps {
  onFilterChange: (filters: {
    name: string;
    location: string;
    sport: string;
  }) => void;
  availableSports: string[];
}

export default function GroundFilter({
  onFilterChange,
  availableSports,
}: GroundFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    location: "",
    sport: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClear = () => {
    const cleared = { name: "", location: "", sport: "" };
    setFilters(cleared);
    onFilterChange(cleared);
  };

  const hasFilters = filters.name || filters.location || filters.sport;

  return (
    <div className="w-full max-w-5xl mx-auto mb-12">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`group flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all duration-300 shadow-sm border ${isOpen
            ? "bg-emerald-600 text-white border-emerald-500 shadow-emerald-100"
            : "bg-white text-slate-700 border-slate-100 "
            }`}
        >
          <AdjustmentsHorizontalIcon className={`w-5 h-5 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
          <span className="font-outfit">
            {isOpen ? "Hide Filters" : "Show Filters"}
          </span>
          <ChevronDownIcon className={`w-4 h-4 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />

          {hasFilters && !isOpen && (
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
          )}
        </button>

        {hasFilters && (
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-400 hover:text-emerald-600 transition-colors"
          >
            <XMarkIcon className="w-4 h-4" />
            Clear All Filters
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="overflow-hidden"
          >
            <div className="bg-white/80 backdrop-blur-md border border-slate-100 p-8 rounded-3xl shadow-2xl shadow-slate-200/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Ground Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
                    Arena Name
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                      <MagnifyingGlassIcon className="h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={filters.name}
                      onChange={handleChange}
                      placeholder="Search by name..."
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl text-slate-900 placeholder:text-slate-300 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
                    Location
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                      <MapPinIcon className="h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      name="location"
                      value={filters.location}
                      onChange={handleChange}
                      placeholder="Search by area..."
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl text-slate-900 placeholder:text-slate-300 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Sport */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
                    Sport Category
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                      <TrophyIcon className="h-5 w-5" />
                    </div>
                    <select
                      name="sport"
                      value={filters.sport}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl text-slate-900 appearance-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium cursor-pointer"
                    >
                      <option value="">All Sports</option>
                      {availableSports.map((sport, idx) => (
                        <option key={idx} value={sport}>
                          {sport}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
