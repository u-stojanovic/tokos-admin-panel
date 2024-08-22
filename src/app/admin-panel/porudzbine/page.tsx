import React from "react";
import { getAllOrdersConfig } from "@/lib/hooks/order/useFetchOrders";
import { QueryClient } from "@tanstack/react-query";
import ListOrders from "./ListOrders";

export default async function Porudzbine() {
  const queryClient = new QueryClient();

  // Prefetch the orders data
  const { queryKey, queryFn } = getAllOrdersConfig();
  await queryClient.prefetchQuery({ queryKey, queryFn });

  return <ListOrders />;
}
