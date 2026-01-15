import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import nodemailer from "nodemailer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: Request) {
  try {
    console.log("EMAIL_USER:", process.env.EMAIL_USER?.slice(0, 5));
    console.log("EMAIL_PASS length:", process.env.EMAIL_PASS?.length);

    const body = await request.json();
    const { date, time, name, email } = body;

    // Validate required fields
    if (!date || !time || !name || !email) {
      return NextResponse.json(
        { error: "Missing required fields: date, time, name, or email" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Check for existing session (for logged-in users)
    const session = await getServerSession(authOptions);
    let userId = null;

    // If user is logged in, try to find their user record
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      userId = user?.id || null;
    }

    const booking = await prisma.booking.create({
      data: {
        selectedDate: date,
        selectedTime: time,
        userId: userId,
        guestName: name,
        guestEmail: email,
      },
    });

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: [email, "sanmsets@gmail.com"],
      subject: "Nail Appointment Booking Confirmation 💕",
      html: `<p>Dear ${name.split(" ")[0]},</p>
            <p>Thank you for booking with Sanmsets! 💕</p>
            <p>Your booking for <strong>${date}</strong> at <strong>${time}</strong> has been confirmed.</p>
            <hr>
            <p>Please request the address within 24 hours of your appointment, if you haven't received it.</p>
            <p>If you need to reschedule, feel free to reach out to me by replying to this email.</p>
            <p>Thank you for choosing Sanmsets. Looking forward to our date! 😊</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { booking, message: "Booking successful and confirmation email sent!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json(
      { error: "Failed to process booking" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany();
    return NextResponse.json(bookings);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
