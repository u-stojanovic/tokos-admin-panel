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
        images: true,
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });
    return product;
  } catch (error) {
    console.log("error: ", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Delete a product and related data
export async function deleteProduct(productId: number) {
  try {
    await prisma.$transaction([
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
    // Check if the category exists, otherwise create a new one
    let categoryId: number;
    const foundCategory = await prisma.category.findFirst({
      where: { name: formValues.category },
    });

    if (foundCategory) {
      categoryId = foundCategory.id;
    } else {
      const newCategory = await prisma.category.create({
        data: { name: formValues.category },
      });
      categoryId = newCategory.id;
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
        ingredients: {
          deleteMany: {}, // Remove all existing ingredients associations
          create: ingredientIds.map((ingredientId) => ({
            ingredientId,
          })),
        },
        images: {
          deleteMany: {}, // Remove all existing images
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
  } finally {
    await prisma.$disconnect();
  }
}

// Create a new product if it doesn't exist, otherwise return the existing product
export async function submitCreate(
  formValues: ProductFormInputs,
): Promise<Product> {
  try {
    // Check if category exists, otherwise create a new one
    let categoryId: number;
    const foundCategory = await prisma.category.findFirst({
      where: { name: formValues.category },
    });
    if (foundCategory) {
      categoryId = foundCategory.id;
    } else {
      const newCategory = await prisma.category.create({
        data: {
          name: formValues.category,
        },
      });
      categoryId = newCategory.id;
    }

    // if product with same data exists
    const existingProduct = await prisma.product.findFirst({
      where: {
        name: formValues.name,
        categoryId,
        description: formValues.description,
        price: formValues.price,
      },
    });

    if (existingProduct) {
      return existingProduct;
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
        categoryId: categoryId,
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
  } finally {
    await prisma.$disconnect();
  }
}
