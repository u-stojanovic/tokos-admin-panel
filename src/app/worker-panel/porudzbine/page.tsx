import { getAllOrdersConfig } from "@/lib/hooks/order/useFetchOrders";
import { QueryClient } from "@tanstack/react-query";
import ListOrders from "@/app/admin-panel/porudzbine/ListOrders";

export default async function Porudzbine() {
  const queryClient = new QueryClient();

  const { queryKey, queryFn } = getAllOrdersConfig();
  await queryClient.prefetchQuery({ queryKey, queryFn });

  // NOTE: Use List Orders from worker panel not from admin panel

  return <ListOrders />;
}
