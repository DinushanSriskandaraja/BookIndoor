import nodemailer from "nodemailer";

interface EmailData {
  to: string;
  subject: string;
  userName: string;
  groundName: string;
  bookingDate: string;
  bookingTime: string;
  amount: number | string;
  text?: string; // ✅ Optional plain-text version
}

export async function sendBookingConfirmationEmail({
  to,
  subject,
  userName,
  groundName,
  bookingDate,
  bookingTime,
  amount,
  text,
}: EmailData) {
  try {
    // Validate recipient email
    if (!to || typeof to !== "string" || !to.includes("@")) {
      throw new Error(`Invalid recipient email: ${to}`);
    }

    // Validate credentials
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Missing email credentials in environment variables");
    }

    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // HTML email body
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 16px; background: #f9f9f9;">
        <div style="background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h2 style="color: #2E8B57;">${subject}</h2>
          <p>Hi <strong>${userName}</strong>,</p>
          <p>Here are your booking details:</p>
          <ul style="line-height: 1.6;">
            <li><strong>Ground:</strong> ${groundName}</li>
            <li><strong>Date:</strong> ${bookingDate}</li>
            <li><strong>Time:</strong> ${bookingTime}</li>
            <li><strong>Amount:</strong> LKR ${amount}</li>
          </ul>
          <p style="margin-top: 16px;">Thank you for choosing <strong>BookIndoor</strong>!</p>
          <p style="color: #555;">Best regards,<br/>The BookIndoor Team</p>
        </div>
      </div>
    `;

    // Send email
    const info = await transporter.sendMail({
      from: `"BookIndoor" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text: text || `Booking confirmation for ${groundName} on ${bookingDate} at ${bookingTime}.`,
      html: htmlContent,
    });

    console.log(`✅ Email successfully sent to ${to}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
}
