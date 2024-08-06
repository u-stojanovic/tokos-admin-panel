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
  }
}
