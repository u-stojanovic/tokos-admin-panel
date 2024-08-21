import { useQuery } from "@tanstack/react-query";
import { CategoryWithSubCategories } from "@/app/admin-panel/kategorije/ListCategories";
import { getCategories } from "../../actions/categoriesActions";

const fetchCategories = async (): Promise<CategoryWithSubCategories[]> => {
  return await getCategories();
};

export const useFetchCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
};
