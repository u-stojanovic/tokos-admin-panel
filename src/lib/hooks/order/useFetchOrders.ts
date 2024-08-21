import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "@/lib/actions/orderActions";
import { Order } from "@/lib";

const fetchOrders = async (): Promise<Order[]> => {
  return await getAllOrders();
};

export const useFetchOrders = () => {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });
};
