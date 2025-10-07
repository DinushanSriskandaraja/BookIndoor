"use client";
import { BookingSummary } from "./BookingForm";
import { useState } from "react";

interface PaymentFormProps {
  amount: number;
  bookingSummary: BookingSummary & { name: string; phone: string; nic: string };
  onPaymentSuccess: (data: any) => void;
}

export default function PaymentForm({
  amount,
  bookingSummary,
  onPaymentSuccess,
}: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !expiry || !cvv || !cardName) {
      alert("Please fill all payment details");
      return;
    }

    const bookingRecord = {
      ...bookingSummary,
      payment: {
        cardName,
        cardNumber: "**** **** **** " + cardNumber.slice(-4),
        expiry,
        cvv: "***",
        amount,
      },
      bookedAt: new Date().toISOString(),
    };

    onPaymentSuccess(bookingRecord);
    alert("Payment successful!");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-green-100/20 backdrop-blur-md border border-green-700/30 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-green-900 text-center">
        Payment Details
      </h2>

      {/* Booking Summary */}
      <div className="bg-green-50/40 p-5 rounded-xl mb-6 border border-green-200/50 shadow-inner">
        <h3 className="font-semibold text-green-800 mb-3 text-lg">Booking Summary</h3>
        <div className="space-y-1 text-green-900">
          <p>
            <span className="font-medium">Name:</span> {bookingSummary.name}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {bookingSummary.phone}
          </p>
          <p>
            <span className="font-medium">NIC/Passport:</span> {bookingSummary.nic}
          </p>
          <p>
            <span className="font-medium">Ground:</span> {bookingSummary.groundName}
          </p>
          <p>
            <span className="font-medium">Date:</span> {bookingSummary.date}
          </p>
          <p>
            <span className="font-medium">Time:</span> {bookingSummary.times.join(", ")}
          </p>
        </div>
      </div>

      {/* Payment Form */}
      <form onSubmit={handlePayment} className="space-y-4">
        <div>
          <label className="block text-green-900 font-medium mb-1">
            Cardholder Name
          </label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="John Doe"
            className="w-full px-4 py-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 bg-white/50 backdrop-blur-sm transition"
          />
        </div>

        <div>
          <label className="block text-green-900 font-medium mb-1">Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
            className="w-full px-4 py-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 bg-white/50 backdrop-blur-sm transition"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-green-900 font-medium mb-1">Expiry</label>
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="MM/YY"
              className="w-full px-4 py-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 bg-white/50 backdrop-blur-sm transition"
            />
          </div>
          <div className="flex-1">
            <label className="block text-green-900 font-medium mb-1">CVV</label>
            <input
              type="password"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="123"
              className="w-full px-4 py-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 bg-white/50 backdrop-blur-sm transition"
            />
          </div>
        </div>

        <div className="mt-4 text-green-900 font-semibold text-lg text-center">
          Total Amount: <span className="text-green-700">Rs.{amount.toFixed(2)}</span>
        </div>

        <button
          type="submit"
          className="w-full mt-4 px-4 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition shadow-md"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
}
