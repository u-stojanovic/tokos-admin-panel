"use server";

import prisma from "../../../prisma/client";
import { Ingredient } from "@prisma/client";

export async function getIngredients(): Promise<Ingredient[]> {
  try {
    const ingredients = await prisma.ingredient.findMany({});
    console.log("ingredients: ", ingredients);
    return ingredients;
  } catch (error) {
    console.log("error: ", error);
    return [];
  } finally {
    prisma.$disconnect();
  }
}

export async function addIngredient(data: any): Promise<Ingredient> {
  try {
  } catch (error) {}
}
