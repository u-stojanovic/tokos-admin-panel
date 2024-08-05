export interface UserInformation {
  username: string;
  email: string;
  id: number;
  role: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
}

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
