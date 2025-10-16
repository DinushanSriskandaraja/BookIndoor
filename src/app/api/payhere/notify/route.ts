import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";

const MERCHANT_ID = process.env.PAYHERE_MERCHANT_ID!;
const MERCHANT_SECRET = process.env.PAYHERE_MERCHANT_SECRET!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    const {
      merchant_id,
      order_id,
      payhere_amount,
      payhere_currency,
      status_code,
      md5sig,
    } = req.body;

    // Rebuild md5sig and compare
    const secretMd5 = crypto
      .createHash("md5")
      .update(MERCHANT_SECRET)
      .digest("hex")
      .toUpperCase();

    const localSig = crypto
      .createHash("md5")
      .update(
        `${merchant_id}${order_id}${payhere_amount}${payhere_currency}${status_code}${secretMd5}`
      )
      .digest("hex")
      .toUpperCase();

    if (localSig !== md5sig) {
      return res.status(400).send("Invalid Signature");
    }

    // status_code 2 = success
    if (parseInt(status_code) === 2) {
      await Booking.findByIdAndUpdate(order_id, { paymentStatus: "full_paid" });
      return res.status(200).send("OK");
    }

    return res.status(400).send("Payment Failed");
  }

  res.status(405).end();
}
