"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Admin {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  nicNumber?: string;
  address?: string;
  bankName?: string;
  accountNumber?: string;
  branchName?: string;
  image?: string;
  managingGround?: string;
}

export default function AdminProfile() {
  const { id } = useParams();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized. Please log in as super admin.");
          setLoading(false);
          return;
        }

        const res = await fetch(`/api/admins/${id}?token=${token}`);
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to fetch admin");
        }

        const data = await res.json();

        // ✅ Clean up backend response: remove sensitive fields if any
        if (data?.admin) {
          const { passwordHash, ...safeAdmin } = data.admin;
          setAdmin(safeAdmin);
        } else {
          setAdmin(null);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    if (id) fetchAdmin();
  }, [id]);

  if (loading)
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!admin)
    return (
      <div className="text-center text-gray-500 mt-10">Admin not found.</div>
    );

  // ✅ Helper: render a line only if value exists
  const renderField = (label: string, value?: string) => {
    if (!value) return null;
    return (
      <p>
        <strong>{label}:</strong> {value}
      </p>
    );
  };

  // Check if personal/bank details exist
  const hasPersonalDetails =
    admin.phone || admin.nicNumber || admin.address || admin.managingGround;
  const hasBankDetails = admin.bankName || admin.accountNumber || admin.branchName;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl max-w-2xl mx-auto border border-slate-100 animate-slideUp overflow-hidden">
        <div className="max-h-[85vh] overflow-y-auto custom-scrollbar pr-2">
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-32 h-32 rounded-[2rem] overflow-hidden border-4 border-emerald-50 shadow-lg mb-4">
              <Image
                src={admin.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(admin.name)}&background=10b981&color=fff&bold=true`}
                alt={admin.name}
                fill
                className="object-cover"
              />
            </div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">{admin.name}</h1>
            <p className="text-emerald-600 font-bold uppercase tracking-widest text-xs mt-1">{admin.email}</p>
          </div>

          <div className="space-y-10">
            {/* 🧍 Personal Info Section */}
            <div className="space-y-4">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
                <span className="w-8 h-px bg-slate-100"></span> Personal Credentials
              </h3>
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
                {hasPersonalDetails ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {admin.phone && (
                      <div>
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">Contact Line</label>
                        <p className="font-bold text-slate-700">{admin.phone}</p>
                      </div>
                    )}
                    {admin.nicNumber && (
                      <div>
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">Identity (NIC)</label>
                        <p className="font-bold text-slate-700">{admin.nicNumber}</p>
                      </div>
                    )}
                    {admin.address && (
                      <div className="sm:col-span-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">Registered Address</label>
                        <p className="font-bold text-slate-700">{admin.address}</p>
                      </div>
                    )}
                    {admin.managingGround && (
                      <div className="sm:col-span-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">Primary Facility</label>
                        <p className="font-bold text-emerald-600">{admin.managingGround}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-slate-400 italic text-sm">No personal credentials on record</p>
                )}
              </div>
            </div>

            {/* 🏦 Bank Info Section */}
            <div className="space-y-4">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
                <span className="w-8 h-px bg-slate-100"></span> Settlement Portfolio
              </h3>
              <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100/50 space-y-4">
                {hasBankDetails ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="sm:col-span-2 flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white text-lg">🏦</div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest text-emerald-900">{admin.bankName}</p>
                        <p className="text-[10px] font-bold text-emerald-600">{admin.branchName || "Main Branch"}</p>
                      </div>
                    </div>
                    <div className="sm:col-span-2 bg-white/60 p-4 rounded-2xl border border-emerald-100">
                      <label className="text-[9px] font-black uppercase tracking-widest text-emerald-400 block mb-0.5">Account Number</label>
                      <p className="font-black text-slate-800 tracking-tight text-lg">{admin.accountNumber}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-400 italic text-sm">No settlement details configured</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
