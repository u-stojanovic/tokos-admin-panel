"use server";
import prisma from "../../../prisma/client";
import { ProductWithRelations } from "..";
import { Product } from "@prisma/client";

export async function getTotalProducts() {
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
  } finally {
    await prisma.$disconnect();
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
  } finally {
    await prisma.$disconnect();
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
  } finally {
    await prisma.$disconnect();
  }
}

export async function submitEdit(
  productId: number,
  formValues: any,
): Promise<Product> {
  try {
    const foundCategory = await prisma.category.findFirst({
      where: { name: formValues.category },
    });

    const categoryData = foundCategory
      ? { connect: { id: foundCategory.id } }
      : { create: { name: formValues.category } };

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name: formValues.name,
        description: formValues.description,
        price: formValues.price,
        category: categoryData,
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

export async function submitCreate(formValues: any): Promise<Product> {
  try {
    const foundCategory = await prisma.category.findFirst({
      where: { name: formValues.category },
    });

    const categoryData = foundCategory
      ? { connect: { id: foundCategory.id } }
      : { create: { name: formValues.category } };

    const newProduct = await prisma.product.findMany();
    // FIX: Return the new created product
    return newProduct;
  } catch (error) {
    console.log("Error updating product: ", error);
    throw new Error("Failed to update product");
  } finally {
    await prisma.$disconnect();
  }
}
