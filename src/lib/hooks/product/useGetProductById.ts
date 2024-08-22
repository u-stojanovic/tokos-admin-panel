import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../actions/productActions";

export const useFetchProductById = (id: number) => {
  return useQuery({
    queryKey: ["getProductById", id],
    queryFn: ({ queryKey }) => getProductById(queryKey[1] as number),
  });
};

export const getProductByIdConfig = (id: number) => {
  const queryKey: [string, number] = ["getProductById", id];

  const queryFn = async ({ queryKey }: { queryKey: [string, number] }) => {
    return await getProductById(queryKey[1]);
  };

  return {
    queryKey,
    queryFn,
  };
};
