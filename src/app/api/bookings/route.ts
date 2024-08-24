import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
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
      to: [email, process.env.EMAIL_USER],
      subject: 'Nail Appointment Booking Confirmation 💕',
      html: `
      <p>Dear ${name},</p>
      <p>Your booking for <strong>${date}</strong> at <strong>${time}</strong> has been confirmed.</p>
      <p>To finalise your booking, please pay your deposit <a href="https://revolut.me/oyesan98km">here</a> and reply to this email with a screenshot of your paid deposit.</p>
      <p>If the deposit has not been sent within 2 hour of receiving this confirmation email, your requested slot will become available again.</p>
      <p>Please request the address within 24hrs of your appointment.</p>
      <p>If you need to reschedule, please feel free to reach out to me by replying to this email.</p>
      <p>Thank you for choosing Sanmsets! 😊</p>
      <hr>
      <p>If you're having trouble with the link, use my rev name directly: <strong>Oyesan98km</strong> or Bank Details:</p>
      <p><strong>Beneficiary:</strong> Oyesanmi Areoye</p>
      <p><strong>IBAN:</strong> IE49 REVO 9903 6067 2177 50</p>
      <p><strong>BIC / SWIFT code:</strong> REVOIE23</p>
    `
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