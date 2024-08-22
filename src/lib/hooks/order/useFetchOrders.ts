import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "@/lib/actions/orderActions";

export const getAllOrdersConfig = () => {
  const queryKey: [string] = ["orders"];

  const queryFn = async () => {
    return await getAllOrders();
  };

  return {
    queryKey,
    queryFn,
  };
};

export const useGetAllOrders = () => {
  const { queryKey, queryFn } = getAllOrdersConfig();

  return useQuery({
    queryKey,
    queryFn,
  });
};
