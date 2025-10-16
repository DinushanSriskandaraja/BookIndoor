import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const body = req.body; // PayHere sends form data
  const orderId = body.order_id;
  const status = body.status_code;

  console.log("IPN Received:", body);

  try {
    await dbConnect();

    if (status === "2") {
      // Payment Successful ✅
      await Booking.findByIdAndUpdate(orderId, {
        paymentStatus: "full_paid",
        status: "confirmed",
      });
      console.log("Booking updated:", orderId);
    } else {
      // Payment failed ❌
      await Booking.findByIdAndUpdate(orderId, {
        paymentStatus: "advanced_paid",
      });
    }

    res.status(200).send("OK");
  } catch (err) {
    console.error("IPN Error:", err);
    res.status(500).send("Error");
  }
}
