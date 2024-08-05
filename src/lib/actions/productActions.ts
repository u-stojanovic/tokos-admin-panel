"use server";
import prisma from "../../../prisma/client";
import { ProductWithRelations } from "..";

export async function getTotalProducts() {
  try {
    const productCount = await prisma.product.aggregate({
      _count: true,
    });
    return productCount._count;
  } catch (error) {
    console.log("error: ", error);
    return error;
  }
}

export async function getProducts(): Promise<ProductWithRelations[]> {
  try {
    const products = await prisma.product.findMany({
      include: {
        images: true,
        ingredients: true,
        category: true,
      },
    });
    return products;
  } catch (error) {
    console.log("error: ", error);
    return [];
  }
}

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
  }
}

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
  }
}

// NOTE: use proper type
export async function submitEdit(formValues: any) {
  try {
  } catch (error) {}
}
