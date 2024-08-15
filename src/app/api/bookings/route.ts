import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: 'gmail', // or another email service
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, time, name, email } = body;

    // Create a user
    const user = await prisma.user.create({
      data: {
        selectedDate: date,
        selectedTime: time,
        userName: name,
        userEmail: email,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: [email, process.env.EMAIL_USER], // Send to both user and yourself
      subject: 'Booking Confirmation',
      text: `Dear ${name},\n\nYour booking for ${date} at ${time} has been confirmed.\n\nPlease request the adress within 24hrs of your appointment.\nIf you need to reschedule, please feel free to reach out to me via instagram or just reply to this email.\n\nThank you for choosing Sanmsets <3!`,
    };

    // Send the confirmation email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Booking successful and confirmation sent!', user }, { status: 200 });
  } catch (error) {
    console.error('Error handling POST request:', error);
    return NextResponse.json({ error: 'Failed to process booking' }, { status: 500 });
  }
}
export async function GET() {
  try {
    // Fetch booked slots from the database
    const bookings = await prisma.user.findMany({
      select: {
        selectedDate: true,
        selectedTime: true,
      },
    });

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error('Error fetching booked slots:', error);
    return NextResponse.json({ error: 'Failed to fetch booked slots' }, { status: 500 });
  }
}