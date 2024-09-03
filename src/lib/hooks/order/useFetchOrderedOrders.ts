import { useQuery } from "@tanstack/react-query";
import { getAllOrderedAndAcceptedOrders } from "@/lib/actions/orderActions";

export const getAllOrderedAndAcceptedOrdersConfig = () => {
  const queryKey: [string] = ["orders"];

  const queryFn = async () => {
    return await getAllOrderedAndAcceptedOrders();
  };

  return {
    queryKey,
    queryFn,
  };
};

export const useGetAllOrderedAndAcceptedOrders = () => {
  const { queryKey, queryFn } = getAllOrderedAndAcceptedOrdersConfig();

  return useQuery({
    queryKey,
    queryFn,
  });
};
