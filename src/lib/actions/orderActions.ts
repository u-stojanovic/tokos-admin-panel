"use server";

import prisma from "../../../prisma/client";
import { Order } from "..";

export async function getAllOrders(): Promise<Order[]> {
  try {
    const orders = await prisma.$queryRaw<Order[]>`
      SELECT
        o.id,
        o."orderedBy",
        o."isOrderVerified",
        o."status",
        o."orderDateTime",
        o."createdAt",
        o."verificationToken",
        jsonb_build_object(
          'city', od.city,
          'adresa', od.adresa,
          'zip', od.zip
        ) AS "orderDeliveryInformation",
        jsonb_agg(
          jsonb_build_object(
            'id', op.id,
            'description', op.description,
            'quantity', op.quantity,
            'product', jsonb_build_object(
              'id', p.id,
              'name', p.name,
              'description', p.description,
              'price', p.price,
              'categoryId', p."categoryId"
            ),
            'option', jsonb_build_object(
              'id', opt.id,
              'cakeSize', opt."cakeSize",
              'cookieSize', opt."cookieSize"
            )
          )
        ) AS "orderedProducts"
      FROM "Order" o
      LEFT JOIN "OrderDeliveryInformation" od ON o."orderDeliveryInformationId" = od.id
      LEFT JOIN "User" u ON o."userId" = u.id
      LEFT JOIN "OrderedProduct" op ON o.id = op."orderId"
      LEFT JOIN "Product" p ON op."productId" = p.id
      LEFT JOIN "Option" opt ON op."optionId" = opt.id
      GROUP BY
        o.id, od.city, od.adresa, od.zip
      ORDER BY o.id;
    `;

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
}
