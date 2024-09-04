"use client";

import React, { useState, useEffect } from "react";
import { useGetAllOrderedAndAcceptedOrders } from "@/lib/hooks/order/useFetchOrderedOrders";
import { Order } from "@/lib";
import OrderModal from "@/components/shared/OrderModal";
import { OrderStatus } from "@prisma/client";
import { SearchIcon } from "lucide-react";
import { SkeletonLoader } from "./SkeletonLoader";

export default function ListOrders() {
  const {
    data: orders,
    isLoading,
    isError,
  } = useGetAllOrderedAndAcceptedOrders();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (orders) {
      const result = orders.filter((order) =>
        order.orderedBy.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredOrders(result as any);
    }
  }, [searchQuery, orders]);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const orderedOrders = filteredOrders.filter(
    (order) => order.status === OrderStatus.Ordered,
  );
  const acceptedOrders = filteredOrders.filter(
    (order) => order.status === (OrderStatus.Accepted as any),
  );

  if (isLoading) return <SkeletonLoader />;

  if (isError) {
    return <div>Failed to load orders.</div>;
  }

  return (
    <section className="flex flex-col gap-6 mt-6 flex-1 overflow-y-auto p-4 w-full">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Orders</h2>
      <div className="relative w-full mb-4">
        <label className="sr-only">Search</label>

        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon />
        </div>
        <input
          type="text"
          id="search"
          placeholder="Search orders..."
          className="w-1/2 bg-white dark:bg-gray-800 rounded-md pl-10 pr-4 py-2 text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Orders with status "Ordered" */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow">
        <h3 className="flex justify-center text-lg text-purple-600 font-semibold p-2 dark:text-white">
          Primljene Porudzbine
        </h3>
        <div className="max-h-[50vh] overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-gray-200 dark:bg-gray-700 z-10">
              <tr>
                <th className="py-3 px-4 text-left dark:text-gray-400">
                  Porudzbina #
                </th>
                <th className="py-3 px-4 text-left dark:text-gray-400">
                  Poručio
                </th>
                <th className="py-3 px-4 text-left dark:text-gray-400">
                  Ukupno
                </th>
                <th className="py-3 px-4 text-left dark:text-gray-400">
                  Status
                </th>
                <th className="py-3 px-4 text-left dark:text-gray-400">
                  Izmena
                </th>
              </tr>
            </thead>
            <tbody>
              {orderedOrders.map((order) => (
                <tr key={order.id} className="border-b dark:border-gray-700">
                  <td className="py-3 px-4 dark:text-gray-400">{order.id}</td>
                  <td className="py-3 px-4 dark:text-gray-400">
                    {order.orderedBy}
                  </td>
                  <td className="py-3 px-4 dark:text-gray-400">
                    {order.orderedProducts?.reduce((total, orderedProduct) => {
                      const productPrice = orderedProduct.product?.price ?? 0;
                      const quantity = orderedProduct.quantity ?? 1;
                      return total + productPrice * quantity;
                    }, 0) || 0}
                  </td>
                  <td className="py-3 px-4 dark:text-gray-400">
                    <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100">
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 dark:text-gray-400">
                    <div className="flex space-x-2">
                      <button
                        className="text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-500 font-semibold"
                        onClick={() => handleViewOrder(order)}
                      >
                        Vidi porudzbinu
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Orders with status "Accepted" */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow mt-6">
        <h3 className="flex justify-center text-lg text-blue-600 font-semibold p-2 dark:text-white">
          Prihvaćene Porudzbine
        </h3>
        <div className="max-h-[50vh] overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-gray-200 dark:bg-gray-700 z-10">
              <tr>
                <th className="py-3 px-4 text-left dark:text-gray-400">
                  Porudzbina #
                </th>
                <th className="py-3 px-4 text-left dark:text-gray-400">
                  Poručio
                </th>
                <th className="py-3 px-4 text-left dark:text-gray-400">
                  Ukupno
                </th>
                <th className="py-3 px-4 text-left dark:text-gray-400">
                  Status
                </th>
                <th className="py-3 px-4 text-left dark:text-gray-400">
                  Izmena
                </th>
              </tr>
            </thead>
            <tbody>
              {acceptedOrders.map((order) => (
                <tr key={order.id} className="border-b dark:border-gray-700">
                  <td className="py-3 px-4 dark:text-gray-400">{order.id}</td>
                  <td className="py-3 px-4 dark:text-gray-400">
                    {order.orderedBy}
                  </td>
                  <td className="py-3 px-4 dark:text-gray-400">
                    {order.orderedProducts?.reduce((total, orderedProduct) => {
                      const productPrice = orderedProduct.product?.price ?? 0;
                      const quantity = orderedProduct.quantity ?? 1;
                      return total + productPrice * quantity;
                    }, 0) || 0}
                  </td>
                  <td className="py-3 px-4 dark:text-gray-400">
                    <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 dark:text-gray-400">
                    <div className="flex space-x-2">
                      <button
                        className="text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-500 font-bold"
                        onClick={() => handleViewOrder(order)}
                      >
                        Vidi Porudzbinu
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
      />
    </section>
  );
}
