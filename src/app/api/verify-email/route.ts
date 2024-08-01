import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    console.log("No token found");
    return NextResponse.json({ message: "No token found" }, { status: 400 });
  }

  try {
    const verification = await prisma.verificationToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!verification) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 },
      );
    }

    if (verification.expiresAt < new Date()) {
      return NextResponse.json(
        { message: "Token has expired" },
        { status: 400 },
      );
    }

    await prisma.user.update({
      where: { id: verification.userId },
      data: { isActive: true },
    });

    await prisma.verificationToken.delete({ where: { token } });

    return NextResponse.json({ message: "Account verified successfully" });
  } catch (e) {
    console.error({ e });
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
