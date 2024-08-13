import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../actions/productActions";
import { ProductWithRelations } from "../..";

const fetchProducts = async (): Promise<ProductWithRelations[]> => {
  return await getProducts();
};

export const useFetchProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};
