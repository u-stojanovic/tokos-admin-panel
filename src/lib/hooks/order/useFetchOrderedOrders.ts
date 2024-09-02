import { useQuery } from "@tanstack/react-query";
import { getAllOrderedOrders } from "@/lib/actions/orderActions";

export const getAllOrderedOrdersConfig = () => {
  const queryKey: [string] = ["orders"];

  const queryFn = async () => {
    return await getAllOrderedOrders();
  };

  return {
    queryKey,
    queryFn,
  };
};

export const useGetAllOrderedOrders = () => {
  const { queryKey, queryFn } = getAllOrderedOrdersConfig();

  return useQuery({
    queryKey,
    queryFn,
  });
};
