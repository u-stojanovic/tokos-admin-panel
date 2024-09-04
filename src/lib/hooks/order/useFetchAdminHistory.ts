import { useQuery } from "@tanstack/react-query";
import { getHistoryOrdersAdmin } from "@/lib/actions/orderActions";

export const getCompletedOrdersHistoryConfig = () => {
  const queryKey: [string] = ["getHistoryOrdersAdmin"];

  const queryFn = async () => {
    return await getHistoryOrdersAdmin();
  };

  return {
    queryKey,
    queryFn,
  };
};

export const useGetCompletedOrderHistory = () => {
  const { queryKey, queryFn } = getCompletedOrdersHistoryConfig();

  return useQuery({
    queryKey,
    queryFn,
  });
};
