"use server";

import prisma from "../../../prisma/client";
import { ProductWithRelations } from "..";
import { Product } from "@prisma/client";
import { ProductFormInputs } from "@/app/admin-panel/proizvodi/new/form";
import { cookies } from "next/headers";

// Fetch total number of products
export async function getTotalProducts() {
  const _ = cookies();
  try {
    const productCount = await prisma.product.aggregate({
      _count: true,
    });
    return productCount._count;
  } catch (error) {
    console.log("error: ", error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

// Fetch all products with related data
export async function getProducts(): Promise<ProductWithRelations[]> {
  const _ = cookies();
  try {
    const products = await prisma.product.findMany({
      include: {
        images: true,
        category: true,
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    return products as ProductWithRelations[];
  } catch (error) {
    console.log("error: ", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

// Fetch product by ID with related data
export async function getProductById(id: number) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        category: true,
        SubCategory: true,
        images: true,
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    return product || null;
  } catch (error) {
    console.log("error: ", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

// Delete a product and related data
export async function deleteProduct(productId: number) {
  try {
    await prisma.$transaction([
      prisma.orderedProduct.deleteMany({
        where: { productId },
      }),
      prisma.productIngredient.deleteMany({
        where: { productId },
      }),
      prisma.image.deleteMany({
        where: { productId },
      }),
      prisma.product.delete({
        where: { id: productId },
      }),
    ]);
    console.log(
      `Product with ID ${productId} and its related data deleted successfully.`,
    );
  } catch (error) {
    console.log("Error deleting product: ", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Edit an existing product
export async function submitEdit(
  productId: number,
  formValues: ProductFormInputs,
): Promise<Product> {
  try {
    let categoryId: number | undefined;
    let subCategoryId: number | undefined | null = null;

    // Check if category exists, otherwise create a new one
    const foundCategory = await prisma.category.findUnique({
      where: { id: formValues.categoryId },
    });

    if (!foundCategory) {
      throw new Error("Category not found");
    }

    categoryId = foundCategory.id;

    // If the category is "torte" or id 3, check subcategory
    if (formValues.subcategoryId) {
      const foundSubCategory = await prisma.subCategory.findFirst({
        where: {
          id: formValues.subcategoryId,
          categoryId: categoryId,
        },
      });

      if (foundSubCategory) {
        subCategoryId = foundSubCategory.id;
      }
    }

    // Processing ingredients to get ids
    const ingredientIds = await Promise.all(
      formValues.addedIngredients.map(async (ingredient) => {
        const foundIngredient = await prisma.ingredient.findFirst({
          where: { name: ingredient.name },
        });
        if (foundIngredient) {
          return foundIngredient.id;
        } else {
          const newIngredient = await prisma.ingredient.create({
            data: {
              name: ingredient.name,
              isAlergen: ingredient.isAlergen,
            },
          });
          return newIngredient.id;
        }
      }),
    );

    // Update the product with the new data
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name: formValues.name,
        description: formValues.description,
        price: formValues.price,
        categoryId: categoryId,
        subCategoryId: subCategoryId,
        ingredients: {
          deleteMany: {},
          create: ingredientIds.map((ingredientId) => ({
            ingredientId,
          })),
        },
        images: {
          deleteMany: {},
          create: formValues.images.map((image) => ({
            imageUrl: image,
          })),
        },
      },
      include: {
        category: true,
        ingredients: {
          include: {
            ingredient: true,
          },
        },
        images: true,
      },
    });

    return updatedProduct;
  } catch (error) {
    console.log("Error updating product: ", error);
    throw new Error("Failed to update product");
  }
}

export async function submitCreate(
  formValues: ProductFormInputs,
): Promise<Product> {
  try {
    let categoryId: number | undefined;
    let subCategoryId: number | undefined | null = null;

    // Check if category exists, otherwise create a new one
    const foundCategory = await prisma.category.findUnique({
      where: { id: formValues.categoryId },
      include: { subCategory: true },
    });

    if (!foundCategory) {
      throw new Error("Category not found");
    }

    categoryId = foundCategory.id;

    const foundSubCategory = foundCategory.subCategory.find(
      (subCat) => subCat.id === formValues.subcategoryId,
    );

    if (foundSubCategory) {
      subCategoryId = foundSubCategory.id;
    }

    // Processing ingredients to get ids
    const ingredientIds = await Promise.all(
      formValues.addedIngredients.map(async (ingredient) => {
        const foundIngredient = await prisma.ingredient.findFirst({
          where: { name: ingredient.name },
        });
        if (foundIngredient) {
          return foundIngredient.id;
        } else {
          const newIngredient = await prisma.ingredient.create({
            data: {
              name: ingredient.name,
              isAlergen: ingredient.isAlergen,
            },
          });
          return newIngredient.id;
        }
      }),
    );

    // Create new product with associated ingredients and images
    const newProduct = await prisma.product.create({
      data: {
        name: formValues.name,
        description: formValues.description,
        categoryId,
        subCategoryId,
        price: formValues.price,
        ingredients: {
          create: ingredientIds.map((ingredientId) => ({
            ingredientId,
          })),
        },
        images: {
          create: formValues.images.map((image) => ({
            imageUrl: image,
          })),
        },
      },
    });

    return newProduct;
  } catch (error) {
    console.log("Error creating product: ", error);
    throw new Error("Failed to create product");
  }
}
