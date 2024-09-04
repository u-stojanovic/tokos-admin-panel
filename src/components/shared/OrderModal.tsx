import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/lib";
import { useAcceptOrderMutation } from "@/lib/hooks/order/useAcceptOrder";
import { useCompleteOrderMutation } from "@/lib/hooks/order/useCompleteOrder";
import { OrderStatus } from "@prisma/client";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

export default function OrderModal({
  isOpen,
  onClose,
  order,
}: OrderModalProps) {
  const acceptOrderMutation = useAcceptOrderMutation({
    onSuccess: () => {
      onClose();
    },
  });

  const completeOrderMutation = useCompleteOrderMutation({
    onSuccess: () => {
      onClose();
    },
  });

  const handleAcceptOrder = () => {
    if (order) {
      acceptOrderMutation.mutate(order as any);
    }
  };

  const handleCompletedOrder = () => {
    if (order) {
      completeOrderMutation.mutate(order as any);
    }
  };
  if (!isOpen || !order) return null;

  const isDeliveryInformationEmpty =
    !order.orderDeliveryInformation?.city &&
    !order.orderDeliveryInformation?.adresa &&
    !order.orderDeliveryInformation?.zip;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <div className="grid gap-6 p-6">
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Porudžbina #{order.id}</h2>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    order.isOrderVerified
                      ? "bg-blue-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {order.isOrderVerified ? "Verified" : "Not Verified"}
                </Badge>
                <Badge
                  variant="outline"
                  className="rounded-full px-3 py-1 text-xs font-medium"
                >
                  {order.status}
                </Badge>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Poručio <span className="font-medium">{order.orderedBy}</span> u{" "}
              <time dateTime={order.createdAt as unknown as string}>
                {new Date(order.createdAt).toLocaleDateString()}{" "}
                {new Date(order.createdAt).toLocaleTimeString()}
              </time>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4">
            <div className="grid gap-2">
              <h3 className="text-lg font-semibold">Informacije o dostavi</h3>
              {isDeliveryInformationEmpty ? (
                <div className="text-sm text-muted-foreground">
                  Pokuplja porudžbinu u prodavnici.
                </div>
              ) : (
                <div className="grid gap-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">City</span>
                    <span>{order.orderDeliveryInformation?.city}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Address</span>
                    <span>{order.orderDeliveryInformation?.adresa}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">ZIP Code</span>
                    <span>{order.orderDeliveryInformation?.zip}</span>
                  </div>
                </div>
              )}
            </div>
            <Separator />
            <div className="grid gap-2">
              <h3 className="text-lg font-semibold">Poručeni proizvodi</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Proizvod</TableHead>
                    <TableHead>Količina</TableHead>
                    <TableHead>Zahtev</TableHead>
                    <TableHead>Cena</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.orderedProducts.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">
                          {product.product.name}
                        </div>
                      </TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          {product.description}
                        </div>
                      </TableCell>
                      <TableCell>
                        {product.product.price.toFixed(2)} RSD
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        <DialogFooter>
          {order.status == OrderStatus.Ordered && (
            <Button
              className="ml-auto bg-purple-500 hover:bg-purple-600"
              onClick={handleAcceptOrder}
              disabled={acceptOrderMutation.isPending}
            >
              {acceptOrderMutation.isPending
                ? "Prihvatanje..."
                : "Prihvati porudžbinu"}
            </Button>
          )}
          {order.status == (OrderStatus.Accepted as any) && (
            <Button
              className="ml-auto bg-green-500 hover:bg-green-600"
              onClick={handleCompletedOrder}
              disabled={completeOrderMutation.isPending}
            >
              {completeOrderMutation.isPending
                ? "Predavanje porudzbine..."
                : "Predaj porudzbinu"}
            </Button>
          )}
          <Button type="button" onClick={onClose}>
            Zatvori
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
