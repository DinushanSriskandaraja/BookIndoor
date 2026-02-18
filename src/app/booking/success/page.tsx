"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { XMarkIcon, MapPinIcon, CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";

interface BookingItem {
    date: string;
    times: string[];
}

interface BookingDetails {
    groundId: string;
    sportName: string;
    groundName: string;
    location: string;
    bookings: BookingItem[];
    amount: number;
}

export default function BookingSuccessPage() {
    const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const storedDetails = sessionStorage.getItem("pendingBooking");
        if (storedDetails) {
            try {
                setBookingDetails(JSON.parse(storedDetails));
                // We keep it in session storage for now so the user can re-open the popup
                // It will be cleared when they leave the page or we can clear it on unmount
            } catch (err) {
                console.error("Failed to parse booking details:", err);
            }
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl max-w-md w-full text-center border border-slate-100">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce-short">
                    <svg
                        className="w-12 h-12 text-emerald-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <h1 className="text-3xl font-black text-slate-900 mb-3 font-outfit">
                    Payment Successful!
                </h1>
                <p className="text-slate-500 mb-10 font-medium">
                    Your booking has been confirmed. You will receive a confirmation email shortly.
                </p>
                <div className="space-y-4">
                    <Link
                        href="/"
                        className="block w-full py-4 px-6 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 transition-all font-bold shadow-lg shadow-emerald-200"
                    >
                        Return to Home
                    </Link>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="block w-full py-4 px-6 bg-white text-emerald-600 border-2 border-emerald-600 rounded-2xl hover:bg-emerald-50 transition-all font-bold"
                    >
                        View My Bookings
                    </button>
                </div>
            </div>

            {/* Booking Details Modal */}
            {isModalOpen && bookingDetails && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="bg-emerald-600 p-6 flex justify-between items-center text-white">
                            <div>
                                <h2 className="text-xl font-black font-outfit">Booking Details</h2>
                                <p className="text-emerald-100 text-xs font-medium opacity-90">Confirmation Summary</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            {/* Ground Info */}
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 shrink-0">
                                        <MapPinIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ground & Location</p>
                                        <h3 className="text-lg font-bold text-slate-800">{bookingDetails.groundName}</h3>
                                        <p className="text-slate-500 font-medium text-sm">{bookingDetails.location}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Sport info */}
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Sport</p>
                                <p className="text-emerald-700 font-black">{bookingDetails.sportName}</p>
                            </div>

                            {/* Bookings */}
                            <div className="space-y-4">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Selected Slots</p>
                                <div className="space-y-3">
                                    {bookingDetails.bookings.map((booking, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-slate-100 rounded-xl text-slate-500">
                                                    <CalendarIcon className="w-5 h-5" />
                                                </div>
                                                <p className="font-bold text-slate-700">{booking.date}</p>
                                            </div>
                                            <div className="flex items-center gap-2 text-emerald-600">
                                                <ClockIcon className="w-4 h-4" />
                                                <p className="text-sm font-black">{booking.times.join(", ")}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Total */}
                            <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                                <p className="font-bold text-slate-400">Amount Paid</p>
                                <p className="text-2xl font-black text-emerald-600">Rs. {bookingDetails.amount.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="p-6 bg-slate-50 border-t border-slate-100">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
                            >
                                Got it, thanks!
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
                @keyframes bounce-short {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-short {
                    animation: bounce-short 2s ease-in-out infinite;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #cbd5e1;
                }
            `}</style>
        </div>
    );
}
