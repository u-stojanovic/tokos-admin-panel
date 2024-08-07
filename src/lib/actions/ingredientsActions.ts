"use server";

import prisma from "../../../prisma/client";
import { Ingredient } from "@prisma/client";

export async function getIngredients(): Promise<Ingredient[]> {
  try {
    const ingredients = await prisma.ingredient.findMany({});
    return ingredients;
  } catch (error) {
    console.log("error: ", error);
    return [];
  } finally {
    prisma.$disconnect();
  }
}

export async function addIngredient(data: {
  name: string;
  isAlergen: boolean;
}): Promise<Ingredient> {
  try {
    // NOTE: Check first if the ingredient exists
    const newIngredient = await prisma.ingredient.create({
      data,
    });
    return newIngredient;
  } catch (error) {
    console.error("Error adding ingredient:", error);
    throw error;
  } finally {
    prisma.$disconnect();
  }
}
