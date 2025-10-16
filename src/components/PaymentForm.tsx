"use client";

import { useState, useEffect } from "react";

interface BookingSummary {
  groundName: string;
  location: string;
  date: string;
  times: string[];
  groundId: string;
  sportName: string;
}

interface PaymentFormProps {
  bookingDetails: BookingSummary;
  amount: number;
  onPaymentSuccess?: (data: any) => void;
}

declare global {
  interface Window {
    payhere: any;
  }
}

export default function PaymentForm({
  bookingDetails,
  amount,
  onPaymentSuccess,
}: PaymentFormProps) {
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    nic: "",
  });
  const [isAdvance, setIsAdvance] = useState(false);
  const [loading, setLoading] = useState(false);

  const finalAmount = isAdvance ? amount * 0.5 : amount;

  // Load PayHere script dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.payhere.lk/lib/payhere.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAdvancePayment = () => setIsAdvance((prev) => !prev);

  const handleBookingAndPay = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userDetails.name || !userDetails.phone || !userDetails.nic) {
      alert("Please fill all fields!");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Create booking
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ground: bookingDetails.groundId,
          sportName: bookingDetails.sportName,
          guest: {
            name: userDetails.name,
            phone: userDetails.phone,
            nicNumber: userDetails.nic,
          },
          date: bookingDetails.date,
          timeSlots: bookingDetails.times.map((t) => ({ startTime: t })),
          paymentStatus: isAdvance ? "advanced_paid" : "full_paid",
        }),
      });

      const bookingData = await res.json();

      if (!res.ok) {
        alert(bookingData.error || "Booking failed!");
        setLoading(false);
        return;
      }

      const orderId = bookingData.bookingId;

      // 2️⃣ Get hash from backend
      const hashRes = await fetch("/api/payhere/hash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, amount: finalAmount }),
      });

      const hashData = await hashRes.json();
      const hash = hashData.hash;

      // 3️⃣ Prepare PayHere payment
      const payment = {
        sandbox: true,
        merchant_id: process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID!,
        return_url: "",
        cancel_url: "",
        notify_url: process.env.NEXT_PUBLIC_PAYHERE_NOTIFY_URL!,
        order_id: orderId,
        items: `Booking #${orderId}`,
        amount: finalAmount.toFixed(2),
        currency: "LKR",
        hash,
        first_name: userDetails.name.split(" ")[0],
        last_name: userDetails.name.split(" ")[1] || "",
        phone: userDetails.phone,
        country: "Sri Lanka",
      };

      // 4️⃣ PayHere callbacks
      window.payhere.onCompleted = function (orderId: string) {
        alert("✅ Payment completed! Order ID: " + orderId);
        if (onPaymentSuccess)
          onPaymentSuccess({ bookingId: orderId, amount: finalAmount });
      };

      window.payhere.onDismissed = function () {
        alert("⚠️ Payment dismissed");
      };

      window.payhere.onError = function (error: string) {
        alert("❌ Payment error: " + error);
      };

      window.payhere.startPayment(payment);
    } catch (err) {
      console.error("Booking & Payment Error:", err);
      alert("Failed to process booking/payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form
        onSubmit={handleBookingAndPay}
        className="p-8 border border-green-700/30 rounded-2xl space-y-6 bg-green-50/30 shadow-lg">
        {/* Booking Summary */}
        <div className="bg-green-50 p-5 rounded-xl border border-green-200 shadow-inner">
          <h3 className="font-semibold text-green-800 mb-3 text-lg">
            Booking Summary
          </h3>
          <div className="space-y-1 text-green-900">
            <p>
              <span className="font-medium">Ground:</span>{" "}
              {bookingDetails.groundName}
            </p>
            <p>
              <span className="font-medium">Location:</span>{" "}
              {bookingDetails.location}
            </p>
            <p>
              <span className="font-medium">Date:</span> {bookingDetails.date}
            </p>
            <p>
              <span className="font-medium">Time:</span>{" "}
              {bookingDetails.times.join(", ")}
            </p>
            <p>
              <span className="font-medium">Payment Type:</span>{" "}
              {isAdvance ? "Advance (50%)" : "Full"}
            </p>
            <div className="mt-4 text-green-900 font-semibold text-lg text-center">
              Total Amount:{" "}
              <span className="text-green-700">
                Rs.{finalAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Advance Payment Toggle */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={toggleAdvancePayment}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              isAdvance
                ? "bg-green-700 text-white"
                : "bg-green-100 text-green-700 border border-green-300"
            }`}>
            {isAdvance ? "Cancel Advance Payment" : "Pay 50% Advance"}
          </button>
        </div>

        {/* User Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-green-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={userDetails.name}
              onChange={handleUserChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="block text-green-700 font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={userDetails.phone}
              onChange={handleUserChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="block text-green-700 font-medium mb-1">
              NIC / Passport
            </label>
            <input
              type="text"
              name="nic"
              value={userDetails.nic}
              onChange={handleUserChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter NIC / Passport"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 px-4 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition disabled:opacity-50">
          {loading
            ? "Processing..."
            : isAdvance
            ? `Pay Rs.${finalAmount.toFixed(2)} (50% Advance)`
            : `Pay Rs.${finalAmount.toFixed(2)} & Confirm Booking`}
        </button>
      </form>
    </div>
  );
}
