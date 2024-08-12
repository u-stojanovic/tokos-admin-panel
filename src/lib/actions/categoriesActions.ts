"use server";

import { cookies } from "next/headers";
import prisma from "../../../prisma/client";

export async function getCategories() {
  const _ = cookies();

  try {
    const categories = await prisma.category.findMany({
      include: {
        subCategory: true,
      },
    });
    return categories;
  } catch (error) {
    console.log("error fetching categories:", error);
    return [];
  } finally {
    prisma.$disconnect();
  }
}
