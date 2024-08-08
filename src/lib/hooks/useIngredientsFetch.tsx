import { useQuery } from "@tanstack/react-query";
import { getIngredients } from "../actions/ingredientsActions";

const fetchIngridients = async () => {
  const ingredients = await getIngredients();
  console.log("fetchIngridients in fetch: ", ingredients);
  return ingredients;
};

export const useFetchIngredients = () => {
  return useQuery({ queryKey: ["ingredients"], queryFn: fetchIngridients });
};
