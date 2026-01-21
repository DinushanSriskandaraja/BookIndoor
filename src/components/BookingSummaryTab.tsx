"use client";

interface BookingSummaryTabProps {
  selectedSport?: string;
  groundId?: string;
}



import React, { useState, useEffect } from "react";


interface SummaryStats {
  income: number;
  totalBookings: number;
  sports: Record<string, number>;
}

interface GroundStat {
  groundId: string;
  groundName: string;
  totalRevenue: number;
  summary: Record<string, SummaryStats>;
}

export default function BookingSummaryTab({ selectedSport, groundId }: BookingSummaryTabProps) {
  const [summaryData, setSummaryData] = useState<Record<string, SummaryStats> | null>(null);
  const [groundWiseStats, setGroundWiseStats] = useState<GroundStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        let url = "/api/stats";
        if (groundId) url += `?ground=${groundId}`;

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data = await res.json();
        if (data.summary) {
          setSummaryData(data.summary);
          if (data.groundWiseStats) {
            setGroundWiseStats(data.groundWiseStats);
          }
        }
      } catch (err) {
        console.error("Error fetching summary:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [groundId]);

  if (loading) return (
    <div className="flex justify-center py-10">
      <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!summaryData) return (
    <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center">
      <p className="text-slate-500 font-medium">No statistical data available yet.</p>
    </div>
  );

  const renderSummaryCards = (data: Record<string, SummaryStats>) => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {Object.entries(data).map(([period, stats]: [string, SummaryStats]) => (
        <div key={period} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col items-center text-center space-y-4">
            <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-widest">
              {period}
            </span>

            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-400">Total Income</p>
              <p className="text-2xl font-black text-emerald-600">
                Rs. {stats.income.toLocaleString()}
              </p>
            </div>

            <div className="w-full pt-3 border-t border-slate-50">
              <p className="text-xs font-bold text-slate-700">
                {stats.totalBookings} <span className="text-slate-400 font-medium">Bookings</span>
              </p>
            </div>

            <div className="w-full space-y-1.5 pt-1">
              {Object.entries(stats.sports || {}).map(([sport, count]) => (
                <div
                  key={sport}
                  className={`flex justify-between items-center text-[10px] p-2 rounded-lg transition-colors ${selectedSport === sport
                    ? "bg-emerald-50 text-emerald-700 font-bold"
                    : "bg-slate-50 text-slate-600"
                    }`}
                >
                  <span>{sport}</span>
                  <span className="bg-white px-1.5 py-0.5 rounded-full shadow-sm">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-12">
      {!groundId && groundWiseStats.length > 0 ? (
        groundWiseStats.map((gw) => (
          <div key={gw.groundId} className="space-y-6">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-bold text-slate-800">{gw.groundName}</h3>
              <div className="h-px flex-1 bg-slate-100"></div>
              <p className="text-sm font-semibold text-emerald-600">
                Total Revenue: Rs. {gw.totalRevenue.toLocaleString()}
              </p>
            </div>
            {renderSummaryCards(gw.summary)}
          </div>
        ))
      ) : (
        renderSummaryCards(summaryData)
      )}
    </div>
  );
}
