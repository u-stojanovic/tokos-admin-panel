import {
  ProductIngredient as PrismaProductIngredient,
  Ingredient as PrismaIngredient,
  SubCategory,
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
  subCategoryId?: number;
  subcategory?: SubCategory;
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

import {
  ProductIngredient as PrismaProductIngredient,
  Ingredient as PrismaIngredient,
} from "@prisma/client";

// Existing types
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

export enum OrderStatus {
  Ordered = "Ordered",
  Completed = "Completed",
  Pending = "Pending",
  Canceled = "Canceled",
}

export enum CakeSize {
  BIG = "BIG",
  SMALL = "SMALL",
}

export enum CookieSize {
  ONE_KG = "ONE_KG",
  TWO_KG = "TWO_KG",
  THREE_KG = "THREE_KG",
}

export type Option = {
  id: number;
  cakeSize?: CakeSize;
  cookieSize?: CookieSize;
};

export type OrderedProduct = {
  id: number;
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    categoryId: number;
  };
  description?: string;
  option?: Option;
  quantity: number;
};

export type OrderDeliveryInformation = {
  id: number;
  city?: string;
  adresa?: string;
  zip?: string;
};

export type Order = {
  id: number;
  orderedBy: string;
  orderedProducts: OrderedProduct[];
  orderDeliveryInformation?: OrderDeliveryInformation;
  isOrderVerified: boolean;
  status: OrderStatus;
  completedBy?: User;
  orderDateTime?: Date;
  createdAt: Date;
  optionId: number | null;
  cakeSize: string | null;
  cookieSize: string | null;
};

export type User = {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
};
