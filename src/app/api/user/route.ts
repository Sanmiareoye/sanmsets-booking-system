import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { hash } from "bcryptjs";
import * as z from "zod";

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

    const { password: userPassword, ...rest } = newUser;

    // Email content
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
