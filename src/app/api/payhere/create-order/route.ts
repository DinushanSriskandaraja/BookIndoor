import crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

const merchantId = process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID!;
const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET!;
const returnUrl = process.env.NEXT_PUBLIC_PAYHERE_RETURN_URL!;
const cancelUrl = process.env.NEXT_PUBLIC_PAYHERE_CANCEL_URL!;
const notifyUrl = process.env.NEXT_PUBLIC_PAYHERE_NOTIFY_URL!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { orderId, amount, customer } = req.body;

  if (!orderId || !amount || !customer)
    return res.status(400).json({ error: "Missing fields" });

  // Generate secure MD5 hash
  const hashString =
    merchantId +
    orderId +
    amount.toFixed(2) +
    "LKR" +
    crypto.createHash("md5").update(merchantSecret).digest("hex");

  const hash = crypto
    .createHash("md5")
    .update(hashString)
    .digest("hex")
    .toUpperCase();

  const paymentData = {
    sandbox: true, // change to false in production
    merchant_id: merchantId,
    return_url: returnUrl,
    cancel_url: cancelUrl,
    notify_url: notifyUrl,
    order_id: orderId,
    items: "Ground Booking",
    amount: amount.toFixed(2),
    currency: "LKR",
    hash: hash,
    first_name: customer.firstName,
    last_name: customer.lastName,
    email: customer.email,
    phone: customer.phone,
    address: customer.address,
    city: customer.city,
    country: "Sri Lanka",
  };

  res.status(200).json(paymentData);
}
