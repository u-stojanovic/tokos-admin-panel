"use server";
import { cookies } from "next/headers";
import prisma from "../../../prisma/client";

export async function getTotalUsers() {
  const _ = cookies();
  try {
    const userCount = await prisma.user.aggregate({
      _count: true,
    });
    return userCount._count;
  } catch (error) {
    console.log("error: ", error);
    return error;
  }
}

export async function getUsers() {
  const _ = cookies();
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        firstName: "asc", // 'desc'
      },
    });
    return users;
  } catch (error) {
    console.log("error: ", error);
    return error;
  }
}
