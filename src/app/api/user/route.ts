import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { hash } from "bcryptjs";
import * as z from "zod";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const userSchema = z.object({
  name: z.string().min(1, "Username is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have at least 8 characters."),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = userSchema.parse(body);
    const hashPassword = await hash(password, 10);
    const existingUserbyEmail = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUserbyEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists." },
        { status: 409 }
      );
    }
    // Create a user
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashPassword,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: [email, "sanmsets@gmail.com"],
      subject: "🎉 Welcome to Sanmsets, Girl! You’re In!",
      html: `<div class="container">
        <div class="header">
            <p>Yay 💕</p>
        </div>
        
        <div class="content">
            
            <p>Hey ${name.split(" ")[0]},</p>
            
            <p>Yay, queen! 👑 Your <strong>Sanmsets</strong> account is officially <em>~activated~</em>, and we're so excited to have you!</p>
            
            <p>✨ <strong>What's next?</strong></p>
            <ul>
                <li><strong>Book your first session</strong> ASAP—your glow-up awaits!</li>
                <li>Peek our services (we're obsessed with helping you slay).</li>
                <li>Follow us on Instagram for vibes and nail designs.</li>
            </ul>
            
            <p><strong>Pro Tip:</strong> Spots fill faster than TikTok trends, so don't wait! 🏃‍♀️💨</p>
            
            <a href="https://www.sanmsets.com" class="cta-button">Book Now →</a>
            
            <p>Need help? Hit reply or DM us—we're all about that <em>VIP treatment</em>.</p>
            
            <p><strong>XOXO,</strong><br>The Sanmsets Squad 💖</p>
            
        </div>
        
        <div class="footer">
            <p>
                <a href="https://instagram.com/sanmsets" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" class="social-icon" width="24"></a>
      `,
    };
    await transporter.sendMail(mailOptions);
    const { password: userPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "Account has been successfully made!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json(
      { error: "Failed to make an account" },
      { status: 500 }
    );
  }
}
