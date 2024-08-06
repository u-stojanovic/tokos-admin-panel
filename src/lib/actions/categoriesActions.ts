"use server";
import prisma from "../../../prisma/client";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    console.log("error fetching categories:", error);
    return [];
  }
}
