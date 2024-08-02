import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import prisma from "../../../../../prisma/client";
import { z } from "zod";
import nodemailer from "nodemailer";
import crypto from "crypto";

// Generate a verification token
function generateVerificationToken() {
  return crypto.randomBytes(32).toString("hex");
}

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  lastname: z.string().min(2, "Last name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// Function to send a verification email
async function sendVerificationEmail(
  email: string,
  name: string,
  token: string,
) {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_APP_URL_PROD
      : process.env.NEXT_PUBLIC_APP_URL_DEV;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const verificationLink = `${baseUrl}/api/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Verify Your Email",
    text: `Hello ${name},\n\nPlease verify your email by clicking the link: ${verificationLink}`,
  };

  await transporter.sendMail(mailOptions);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: "Validation error", errors: result.error.errors },
        { status: 400 },
      );
    }

    const { name, lastname, email, username, password } = result.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 },
      );
    }

    const hashedPassword = await hash(password, 10);
    const verificationToken = generateVerificationToken();

    const newUser = await prisma.user.create({
      data: {
        firstName: name,
        lastName: lastname,
        email,
        username,
        password: hashedPassword,
        isActive: false,
        verificationToken: {
          create: {
            token: verificationToken,
          },
        },
      },
    });

    await sendVerificationEmail(
      newUser.email,
      newUser.firstName,
      verificationToken,
    );

    return NextResponse.json({
      message:
        "User created successfully. Please check your email to verify your account.",
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (e) {
    console.error({ e });
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
