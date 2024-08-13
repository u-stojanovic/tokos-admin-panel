import { useQuery } from "@tanstack/react-query";
import { Category } from "@prisma/client";
import { getCategories } from "../actions/categoriesActions";

const fetchCategories = async (): Promise<Category[]> => {
  return await getCategories();
};

export const useFetchCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
};
