import {
  ProductIngredient as PrismaProductIngredient,
  Ingredient as PrismaIngredient,
} from "@prisma/client";

export interface UserInformation {
  username: string;
  email: string;
  id: number;
  role: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
}

// Extend Prisma's ProductIngredient type to include the nested Ingredient type
export type ProductIngredient = PrismaProductIngredient & {
  ingredient: {
    id: number;
    name: string;
    isAlergen: boolean;
  };
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number | null;
  categoryId: number;
  images: Image[];
  category: Category;
  ingredients: ProductIngredient[]; // Use the extended type here
};

export type ProductWithRelations = {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  price: number | null;
  images: {
    id: number;
    imageUrl: string;
    productId: number;
  }[];
  category: {
    id: number;
    name: string;
  };
  ingredients: ProductIngredient[]; // Use the extended type here
};

// Example for an Image type (you need to replace this with your actual Image type)
export type Image = {
  id: number;
  imageUrl: string;
  productId: number;
};

// Example for a Category type (you need to replace this with your actual Category type)
export type Category = {
  id: number;
  name: string;
};
