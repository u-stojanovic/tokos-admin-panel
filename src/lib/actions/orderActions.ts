"use server";

import { OrderStatus } from "@prisma/client";
import prisma from "../../../prisma/client";
import { getUserAndRole } from "../auth/authUtils";

export async function getAllOrders() {
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

export async function getAllOrderedAndAcceptedOrders() {
  try {
    const orders = await prisma.order.findMany({
      where: {
        status: {
          in: ["Ordered", "Accepted"],
        },
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

export async function acceptOrder(order: any) {
  try {
    const { user } = await getUserAndRole();

    if (!user) {
      throw new Error("User not logged in");
    }

    const foundUser = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    if (!foundUser) {
      throw new Error("User not found in user");
    }

    const foundOrder = await prisma.order.findUnique({
      where: {
        id: order.id,
      },
    });

    if (!foundOrder) {
      throw new Error("Order not found");
    }

    await prisma.order.update({
      where: {
        id: foundOrder.id,
      },
      data: {
        status: OrderStatus.Accepted,
      },
    });
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function completeOrder(order: any) {
  try {
    const { user } = await getUserAndRole();

    if (!user) {
      throw new Error("User not logged in");
    }

    const foundUser = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    if (!foundUser) {
      throw new Error("User not found in user");
    }

    const foundOrder = await prisma.order.findUnique({
      where: {
        id: order.id,
      },
    });

    if (!foundOrder) {
      throw new Error("Order not found");
    }

    await prisma.order.update({
      where: {
        id: foundOrder.id,
      },
      data: {
        status: OrderStatus.Completed,
        userId: user.id,
      },
    });
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function getHistoryOrdersAdmin() {
  try {
    const foundOrders = await prisma.order.findMany({
      where: {
        status: OrderStatus.Completed,
      },
      include: {
        orderedProducts: {
          include: {
            product: true,
          },
        },
        completedBy: true,
      },
    });

    if (!foundOrders) {
      return [];
    }

    return foundOrders;
  } catch (error) {
    console.log("error: ", error);
    return [];
  }
}

export async function getCompletedOrdersForUserHistory() {
  try {
    const { user } = await getUserAndRole();

    if (!user) {
      throw new Error("User not logged in");
    }

    const foundUser = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    if (!foundUser) {
      throw new Error("User not found in user");
    }

    const foundOrders = await prisma.order.findMany({
      where: {
        userId: foundUser.id,
        status: OrderStatus.Completed,
      },
      include: {
        orderedProducts: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!foundOrders) {
      return [];
    }

    return foundOrders;
  } catch (error) {
    console.log("error");
    return [];
  }
}
