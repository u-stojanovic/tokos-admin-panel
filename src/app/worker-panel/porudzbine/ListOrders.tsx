"use client";

import React, { useState, useEffect } from "react";
import { useGetAllOrderedOrders } from "@/lib/hooks/order/useFetchOrderedOrders";
import { Order } from "@/lib";
import OrderModal from "@/components/shared/OrderModal";

export default function ListOrders() {
  const { data: orders, isLoading, isError } = useGetAllOrderedOrders();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (orders) {
      const result = orders.filter((order: any) =>
        order.orderedBy.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredOrders(result as any);
    }
  }, [searchQuery, orders]);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Failed to load orders.</div>;
  }

  return (
    <section className="flex flex-col gap-6 mt-6 flex-1 overflow-y-auto p-4 w-full">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Orders</h2>
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-x-auto">
        <div className="flex flex-col md:flex-row items-center justify-between bg-gray-200 dark:bg-gray-700 p-4">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search orders..."
              className="w-full bg-gray-100 dark:bg-gray-800 rounded-md px-4 py-2 text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex space-x-2 w-full md:w-auto">
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md dark:bg-indigo-400 dark:hover:bg-indigo-500 w-full md:w-auto">
              Filter
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-400 w-full md:w-auto">
              Export
            </button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="py-3 px-4 text-left dark:text-gray-400">
                Order #
              </th>
              <th className="py-3 px-4 text-left dark:text-gray-400">
                Customer
              </th>
              <th className="py-3 px-4 text-left dark:text-gray-400">Total</th>
              <th className="py-3 px-4 text-left dark:text-gray-400">Status</th>
              <th className="py-3 px-4 text-left dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
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
                  <span
                    className={`px-2 py-1 rounded-full ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                        : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                          : order.status === "Canceled"
                            ? "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4 dark:text-gray-400">
                  <div className="flex space-x-2">
                    <button
                      className="text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-500"
                      onClick={() => handleViewOrder(order)}
                    >
                      View
                    </button>
                    <button className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500">
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
      />
    </section>
  );
}
