import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../actions/productActions";
import { Product } from "@prisma/client";

const getProduct = async (id: number) => {
  const product = await getProductById(id);
  return product;
};

export const useGetProductById = (id: number) => {
  return useQuery<Product | null>({
    queryKey: ["getProduct", id],
    queryFn: ({ queryKey }) => getProduct(queryKey[1] as number),
  });
};
