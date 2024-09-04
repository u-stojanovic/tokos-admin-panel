import { useQuery } from "@tanstack/react-query";
import { getCompletedOrdersForUserHistory } from "@/lib/actions/orderActions";

export const getUsersHistoryOrdersConfig = () => {
  const queryKey: [string] = ["getCompletedOrdersForUserHistory"];

  const queryFn = async () => {
    return await getCompletedOrdersForUserHistory();
  };

  return {
    queryKey,
    queryFn,
  };
};

export const useGetUsersOrderHistory = () => {
  const { queryKey, queryFn } = getUsersHistoryOrdersConfig();

  return useQuery({
    queryKey,
    queryFn,
  });
};
