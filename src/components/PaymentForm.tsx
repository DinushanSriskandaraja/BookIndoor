"use client";

import { useState } from "react";

interface BookingItem {
  date: string;
  times: string[];
}

interface BookingSummary {
  groundName: string;
  location: string;
  groundId: string;
  sportName: string;
  bookings: BookingItem[];
}

interface BookingResponse {
  bookingIds: string[];
  message?: string;
  error?: string;
}

interface PaymentFormProps {
  bookingDetails: BookingSummary;
  amount: number;
  onPaymentSuccess?: (data: BookingResponse) => void;
}

// ✅ User details type
interface UserDetails {
  name: string;
  phone: string;
  nic: string;
  email: string;
}

// ✅ Keys type for iteration
type UserDetailKeys = keyof UserDetails;

export default function PaymentForm({
  bookingDetails,
  amount,
  onPaymentSuccess,
}: PaymentFormProps) {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "",
    phone: "",
    nic: "",
    email: "",
  });

  const [isAdvance, setIsAdvance] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Type-safe handler
  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in userDetails) {
      setUserDetails((prev) => ({ ...prev, [name as UserDetailKeys]: value }));
    }
  };

  const finalAmount = isAdvance ? amount * 0.5 : amount;
  const toggleAdvancePayment = () => setIsAdvance((prev) => !prev);

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !userDetails.name ||
      !userDetails.phone ||
      !userDetails.nic ||
      !userDetails.email
    ) {
      alert("Please fill in all your details including email.");
      return;
    }

    setLoading(true);

    try {
      // Step 0: Get token
      const token = localStorage.getItem("token");

      // Step 1: Create booking
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token, // ✅ Pass token to link booking to user
          ground: bookingDetails.groundId,
          sportName: bookingDetails.sportName,
          guest: {
            name: userDetails.name,
            phone: userDetails.phone,
            nicNumber: userDetails.nic,
          },
          bookings: bookingDetails.bookings.map((b) => ({
            date: b.date,
            timeSlots: b.times.map((t) => ({ startTime: t })),
          })),
          paymentStatus: isAdvance ? "advanced_paid" : "full_paid",
        }),
      });

      const data: BookingResponse = await response.json();
      if (!response.ok) {
        alert(data.error || "Booking failed!");
        setLoading(false);
        return;
      }

      console.log("✅ Bookings created successfully:", data);

      // Step 2: Send confirmation emails
      const isSingleDate = bookingDetails.bookings.length === 1;
      const bookingDateParam = isSingleDate ? bookingDetails.bookings[0].date : "Multiple Dates";
      const bookingTimeParam = isSingleDate
        ? bookingDetails.bookings[0].times.join(", ")
        : bookingDetails.bookings.map((b) => `${b.date}: ${b.times.join(", ")}`).join("\n");

      const emailResponse = await fetch("/api/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: userDetails.email,
          adminEmail: "groundadmin@example.com",
          userName: userDetails.name,
          groundName: bookingDetails.groundName,
          bookingDate: bookingDateParam,
          bookingTime: bookingTimeParam,
          amount: `Rs.${finalAmount.toFixed(2)} (${isAdvance ? "Advance (50%)" : "Full"
            })`,
        }),
      });

      const emailData = await emailResponse.json();
      console.log("📧 Email API response:", emailData);

      if (!emailResponse.ok) {
        alert("Bookings confirmed, but email failed to send.");
      } else {
        alert(
          `✅ ${isAdvance ? "Advance" : "Full"
          } payment of Rs.${finalAmount.toFixed(2)} successful!\nBookings ID count: ${data.bookingIds.length
          }\nConfirmation email sent!`
        );
      }

      if (onPaymentSuccess) onPaymentSuccess(data);
    } catch (err) {
      console.error("Booking Error:", err);
      alert("Failed to complete booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full max-w-3xl mx-auto h-[90vh] overflow-y-auto rounded-2xl scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-green-100"
      style={{ scrollBehavior: "smooth" }}>
      <form
        onSubmit={handleBooking}
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
            <div className="max-h-40 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-green-200">
              {bookingDetails.bookings.map((booking, index) => (
                <div key={index} className="bg-white/50 p-3 rounded-lg border border-green-100/50">
                  <p className="text-sm font-bold text-green-800 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    {booking.date}
                  </p>
                  <p className="text-sm text-green-700 mt-1 pl-4">
                    {booking.times.join(", ")}
                  </p>
                </div>
              ))}
            </div>
            <p className="border-t border-green-200 pt-3">
              <span className="font-medium">Payment Type:</span>{" "}
              {isAdvance ? "Advance (50%)" : "Full"}
            </p>
            <div className="mt-4 text-green-900 font-bold text-xl text-center bg-green-100 py-3 rounded-lg shadow-sm">
              Grand Total:{" "}
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
            className={`px-4 py-2 rounded-lg font-semibold transition ${isAdvance
              ? "bg-green-700 text-white"
              : "bg-green-100 text-green-700 border border-green-300"
              }`}>
            {isAdvance ? "Cancel Advance Payment" : "Pay 50% Advance"}
          </button>
        </div>

        {/* User Details */}
        <div className="space-y-4">
          {(["name", "email", "phone", "nic"] as UserDetailKeys[]).map(
            (field) => (
              <div key={field}>
                <label className="block text-green-700 font-medium mb-1">
                  {field === "name"
                    ? "Full Name"
                    : field === "email"
                      ? "Email Address"
                      : field === "phone"
                        ? "Phone Number"
                        : "NIC / Passport Number"}
                </label>
                <input
                  type={
                    field === "email"
                      ? "email"
                      : field === "phone"
                        ? "tel"
                        : "text"
                  }
                  name={field}
                  value={userDetails[field]}
                  onChange={handleUserChange}
                  placeholder={
                    field === "name"
                      ? "Enter your full name"
                      : field === "email"
                        ? "Enter your email address"
                        : field === "phone"
                          ? "Enter your phone number"
                          : "Enter your NIC or Passport number"
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
            )
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 px-4 py-3 bg-green-700 !text-white font-bold rounded-lg hover:bg-green-800 transition disabled:opacity-50 shadow-lg"
        >
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
