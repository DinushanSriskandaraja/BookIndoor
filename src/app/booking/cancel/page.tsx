"use client";

import Link from "next/link";

export default function BookingCancelPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                        className="w-10 h-10 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Payment Cancelled
                </h1>
                <p className="text-gray-600 mb-8">
                    Your payment process was cancelled or failed. Your booking status is pending.
                </p>
                <div className="space-y-4">
                    <Link
                        href="/"
                        className="block w-full py-3 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition font-medium"
                    >
                        Return to Home
                    </Link>
                    {/* <Link
            href="/booking"
            className="block w-full py-3 px-4 bg-white text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
          >
            Try Again
          </Link> */}
                </div>
            </div>
        </div>
    );
}
