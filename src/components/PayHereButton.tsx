"use client";

import { useState } from "react";

interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

interface PayHereButtonProps {
  orderId: string;
  amount: number;
}

declare global {
  interface Window {
    payhere: any;
  }
}

export default function PayHereButton(
  { orderId, amount }: PayHereButtonProps,
  secureAmount: any,
  userDetails: { name: string; phone: string; nic: string }
) {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/payhere/hash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          amount: amount.toFixed(2),
          currency: "LKR",
        }),
      });

      const { hash } = await res.json();

      const payment = {
        sandbox: true,
        merchant_id: process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID,
        return_url: undefined,
        cancel_url: undefined,
        notify_url: process.env.NEXT_PUBLIC_PAYHERE_NOTIFY_URL,
        order_id: orderId,
        items: `Order #${orderId}`,
        amount: amount.toFixed(2),
        currency: "LKR",
        hash,

        country: "Sri Lanka",
      };

      window.payhere.onCompleted = function (orderId: string) {
        console.log("✅ Payment completed:", orderId);
      };

      window.payhere.onDismissed = function () {
        console.log("❌ Payment dismissed");
      };

      window.payhere.onError = function (error: string) {
        console.error("⚠️ Error:", error);
      };

      window.payhere.startPayment(payment);
    } catch (error) {
      console.error("Payment Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePay}
      disabled={loading}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
      {loading ? "Processing..." : "Pay with PayHere"}
    </button>
  );
}
