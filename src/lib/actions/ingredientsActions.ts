"use server";

import prisma from "../../../prisma/client";
import { Ingredient } from "@prisma/client";

export async function getIngredients(): Promise<Ingredient[]> {
  try {
    const ingredients = await prisma.ingredient.findMany();
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
}): Promise<Ingredient | string> {
  try {
    const foundIngredient = await prisma.ingredient.findFirst({
      where: {
        name: {
          equals: data.name,
          mode: "insensitive",
        },
      },
    });

    if (foundIngredient) {
      return "Ingredient Already Exists";
    }

    const newIngredient = await prisma.ingredient.create({
      data: {
        name: data.name,
        isAlergen: data.isAlergen,
      },
    });

    console.log("newIngredient: ", newIngredient);
    return newIngredient;
  } catch (error) {
    console.error("Error adding ingredient:", error);
    throw error;
  } finally {
    prisma.$disconnect();
  }
}
