export interface UserInformation {
  username: string;
  email: string;
  id: number;
  role: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
}

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number | null;
  categoryId: number;
  images: Image[];
  category: Category;
  ingredients: ProductIngredient[];
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
  ingredients: {
    productId: number;
    ingredientId: number;
  }[];
};
