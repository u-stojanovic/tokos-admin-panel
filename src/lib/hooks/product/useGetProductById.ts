import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../actions/productActions";

const getProduct = async (id: number) => {
  const users = await getProductById(id);
  return users;
};

export const useGetProductById = (id: number) => {
  return useQuery({
    queryKey: ["getProduct", id],
    queryFn: ({ queryKey }) => getProduct(queryKey[1] as number),
  });
};
