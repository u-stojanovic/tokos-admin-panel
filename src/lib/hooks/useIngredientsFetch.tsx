import { useQuery } from "@tanstack/react-query";
import { getUserAndRole } from "@/lib/auth/authUtils";
import { getIngredients } from "../actions/ingredientsActions";

const fetchIngridients = async () => {
  const ingredients = await getIngredients();
  return ingredients;
};

export const useUserAndRole = () => {
  return useQuery({ queryKey: ["ingredients"], queryFn: fetchIngridients });
};
