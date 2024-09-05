"use client";

import { useGetUsersOrderHistory } from "@/lib/hooks/order/useFetchUsersCompletedOrders";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@prisma/client";

export default function Istorija() {
  const { data: orders, isLoading, isError } = useGetUsersOrderHistory();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading order history</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Istorija Izvršenih Porudžbina</h1>
      <Separator />

      {orders && orders.length === 0 ? (
        <div className="text-muted-foreground mt-4">
          Nema završenih porudžbina.
        </div>
      ) : (
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Porudzbina #</TableHead>
              <TableHead>Datum</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Poručeni proizvodi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders &&
              orders.map((order: any) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        order.status === OrderStatus.Completed
                          ? "bg-green-500 text-white"
                          : "bg-gray-500 text-white"
                      }`}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {order.orderedProducts.map(
                      (product: any, index: number) => (
                        <div key={index}>
                          {product.product.name} x {product.quantity}
                        </div>
                      ),
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
