"use server";
import { getServerSession } from "next-auth";
import prisma from "../../../prisma/client";

export async function getUserAndRole() {
  const session = await getServerSession();

  if (!session) {
    return { redirectPath: "/login" };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email as string,
    },
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      isActive: true,
      role: true,
    },
  });

  if (!user) {
    return { redirectPath: "/login" };
  }

  return { user };
}
