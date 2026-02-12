"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function BookingSuccessPage() {
    useEffect(() => {
        // Optionally trigger a verification or email sending here if not done via notify
        // or just display the success message
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                        className="w-10 h-10 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Payment Successful!
                </h1>
                <p className="text-gray-600 mb-8">
                    Your booking has been confirmed. You will receive a confirmation email shortly.
                </p>
                <div className="space-y-4">
                    <Link
                        href="/"
                        className="block w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                    >
                        Return to Home
                    </Link>
                    <Link
                        href="/profile"
                        className="block w-full py-3 px-4 bg-white text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition font-medium"
                    >
                        View My Bookings
                    </Link>
                </div>
            </div>
        </div>
    );
}
