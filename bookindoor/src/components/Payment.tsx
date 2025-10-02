"use client"

export default function Payment({ amount }: { amount: number }) {
  return (
    <div className="mt-6 p-4 border rounded-lg shadow">
      <p className="mb-4">Total Amount: Rs.{amount}</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
        Pay Now
      </button>
    </div>
  );
}
