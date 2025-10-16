import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { orderId, amount, currency = "LKR" } = await req.json();

    // PayHere merchant credentials
    const merchant_id = process.env.PAYHERE_MERCHANT_ID!;
    const merchant_secret = process.env.PAYHERE_MERCHANT_SECRET!;

    // Generate hash
    const hashString = `${merchant_id}${orderId}${amount}${currency}${merchant_secret}`;
    const hash = crypto.createHash("md5").update(hashString).digest("hex");

    return NextResponse.json({ hash });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to generate hash" },
      { status: 500 }
    );
  }
}
