"use server";

import prisma from "../../../prisma/client";
import { Order } from "@prisma/client";

export async function getAllOrders(): Promise<Order[]> {
  try {
    const orders = await prisma.order.findMany({
      include: {
        OrderDeliveryInformation: {
          select: {
            city: true,
            adresa: true,
            zip: true,
          },
        },
        orderedProducts: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                description: true,
                price: true,
                categoryId: true,
              },
            },
            option: {
              select: {
                id: true,
                cakeSize: true,
                cookieSize: true,
              },
            },
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  } finally {
    await prisma.$disconnect();
  }
}

export async function getAllOrderedOrders(): Promise<Order[]> {
  try {
    const orders = await prisma.order.findMany({
      where: {
        status: "Ordered",
      },
      include: {
        OrderDeliveryInformation: {
          select: {
            city: true,
            adresa: true,
            zip: true,
          },
        },
        orderedProducts: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                description: true,
                price: true,
                categoryId: true,
              },
            },
            option: {
              select: {
                id: true,
                cakeSize: true,
                cookieSize: true,
              },
            },
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  } finally {
    await prisma.$disconnect();
  }
}

export async function acceptOrder(data: {
  user: { id: number };
  order: Order;
}) {
  try {
  } catch (error) {}
}
