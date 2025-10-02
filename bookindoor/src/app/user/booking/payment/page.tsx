"use client";
import { useState } from "react";

export default function PaymentPage() {
  const [cardNumber, setCardNumber] = useState("");

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-indigo-600">Payment</h2>

      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-gray-700 mb-1">Expiry</label>
            <input
              type="text"
              placeholder="MM/YY"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 mb-1">CVV</label>
            <input
              type="password"
              placeholder="123"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
}
