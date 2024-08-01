import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import prisma from "../../../../../prisma/client";
import { z } from "zod";

const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name is required and must be at least 2 characters long"),
  lastname: z
    .string()
    .min(2, "Last name is required and must be at least 2 characters long"),
  email: z.string().email({ message: "Invalid email address" }),
  username: z
    .string()
    .min(3, "Username is required and must be at least 3 characters long"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

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

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 },
      );
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        firstName: name,
        lastName: lastname,
        email,
        username,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: "User created successfully",
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
