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
}): Promise<Ingredient> {
  try {
    const foundIngredient = await prisma.ingredient.findFirst({
      where: {
        name: data.name,
        isAlergen: data.isAlergen,
      },
    });

    console.log("foundIngredient: ", foundIngredient);

    if (!foundIngredient) {
      const newIngredient = await prisma.ingredient.create({
        data: {
          name: data.name,
          isAlergen: data.isAlergen,
        },
      });
      console.log("newIngredient: ", newIngredient);
      return newIngredient;
    }

    return foundIngredient;
  } catch (error) {
    console.error("Error adding ingredient:", error);
    throw error;
  } finally {
    prisma.$disconnect();
  }
}
