"use server";

import prisma from "../../../prisma/client";
import { Order } from "..";

export async function getAllOrders(): Promise<Order[]> {
  try {
    const orders = await prisma.$queryRaw<Order[]>`
SELECT o.id, o."orderedBy", o."isOrderVerified", o."status", o."orderDateTime", o."createdAt", o."verificationToken",
             od.city, od.adresa, od.zip,
             u.id as "userId", u.email, u.username, u."firstName", u."lastName", u.role,
             op.id as "orderedProductId", op.description, op.quantity,
             p.id as "productId", p.name, p.description as "productDescription", p.price,
             opt.id as "optionId", opt."cakeSize", opt."cookieSize"
      FROM "Order" o
      LEFT JOIN "OrderDeliveryInformation" od ON o."orderDeliveryInformationId" = od.id
      LEFT JOIN "User" u ON o."userId" = u.id
      LEFT JOIN "OrderedProduct" op ON o.id = op."orderId"
      LEFT JOIN "Product" p ON op."productId" = p.id
      LEFT JOIN "Option" opt ON op."optionId" = opt.id
    `;

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
}
