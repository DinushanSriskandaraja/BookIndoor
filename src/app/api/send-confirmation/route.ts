import { NextResponse } from "next/server";
import { sendBookingConfirmationEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const {
      userEmail,
      adminEmail,
      userName,
      groundName,
      bookingDate,
      bookingTime,
      amount,
    } = await req.json();

    // Validate inputs
    if (!userEmail || !adminEmail) {
      console.error("❌ Missing recipient emails:", { userEmail, adminEmail });
      return NextResponse.json(
        { success: false, error: "Missing recipient email addresses" },
        { status: 400 }
      );
    }

    console.log("📧 Sending booking confirmation to:", userEmail);
    console.log("📧 Notifying ground admin at:", adminEmail);

    // ✅ Send booking confirmation email to user
    await sendBookingConfirmationEmail({
      to: userEmail,
      subject: "Your Booking Confirmation - BookIndoor",
      userName,
      groundName,
      bookingDate,
      bookingTime,
      amount,
      text: `Hi ${userName},

Your booking for ${groundName} has been confirmed!

📅 Date: ${bookingDate}
⏰ Time: ${bookingTime}
💰 Amount Paid: ${amount}

Thank you for using BookIndoor!`,
    });

    // ✅ Send new booking notification email to ground admin
    await sendBookingConfirmationEmail({
      to: adminEmail,
      subject: "New Booking Received - BookIndoor",
      userName: "Ground Admin",
      groundName,
      bookingDate,
      bookingTime,
      amount,
      text: `Hi Ground Admin,

A new booking has been made for your ground.

👤 User: ${userName}
📍 Ground: ${groundName}
📅 Date: ${bookingDate}
⏰ Time: ${bookingTime}
💰 Amount: ${amount}

Please check your admin panel for more details.`,
    });

    console.log("✅ Emails sent successfully!");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Email send failed:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
