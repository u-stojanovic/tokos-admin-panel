"use server";

import { cookies } from "next/headers";
import prisma from "../../../prisma/client";
import { CategoryFormInputs } from "@/app/admin-panel/kategorije/components/TriggerNewCategoryModalButton";
import { Category } from "@prisma/client";

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

export async function createCategory(
  formValues: CategoryFormInputs,
  id?: number,
): Promise<Category | string> {
  try {
    if (!id) {
      const foundCategory = await prisma.category.findFirst({
        where: {
          name: {
            equals: formValues.categoryName,
            mode: "insensitive",
          },
        },
      });

      if (foundCategory) return "Category Already Exists";

      // Create new category
      const newCategory = await prisma.category.create({
        data: {
          name: formValues.categoryName,
        },
      });

      return newCategory;
    } else {
      // when id is present

      const foundIdCategory = await prisma.category.findFirst({
        where: {
          id: id,
        },
      });

      if (!foundIdCategory) return "Parent Category not found";

      const foundSubCategory = await prisma.subCategory.findFirst({
        where: {
          name: {
            equals: formValues.categoryName,
            mode: "insensitive",
          },
          categoryId: id,
        },
      });

      if (foundSubCategory)
        return `SubCategory of ${foundIdCategory.name} already exists: ${foundSubCategory.name}`;

      const newSubCategory = await prisma.subCategory.create({
        data: {
          name: formValues.categoryName,
          categoryId: id,
        },
      });

      return newSubCategory;
    }
  } catch (error) {
    console.error("error: ", error);
    return "An error occurred";
  } finally {
    prisma.$disconnect();
  }
}

export type DeleteCategoryResult =
  | { success: true; message: string }
  | { success: false; message: string };

export async function deleteCategory(
  id: number,
): Promise<DeleteCategoryResult> {
  try {
    const subCategory = await prisma.subCategory.findUnique({
      where: { id },
    });

    if (subCategory) {
      // Use a transaction to delete the subcategory
      await prisma.$transaction(async (prisma) => {
        await prisma.subCategory.delete({
          where: { id },
        });
      });

      return {
        success: true,
        message: `Subcategory '${subCategory.name}' deleted successfully.`,
      };
    }

    const category = await prisma.category.findUnique({
      where: { id },
      include: { subCategory: true }, // Include subcategories in the result
    });

    if (!category) {
      return { success: false, message: "Category not found." };
    }

    await prisma.$transaction(async (prisma) => {
      // Delete subcategories first
      if (category.subCategory.length > 0) {
        await prisma.subCategory.deleteMany({
          where: { categoryId: id },
        });
      }

      // Delete the category itself
      await prisma.category.delete({
        where: { id },
      });
    });

    return {
      success: true,
      message: `Category '${category.name}' and its subcategories deleted successfully.`,
    };
  } catch (error) {
    console.error("Error deleting category:", error);
    return {
      success: false,
      message: "An error occurred while trying to delete the category.",
    };
  } finally {
    prisma.$disconnect(); // Disconnect from Prisma (if necessary, depending on your setup)
  }
}
