"use client";

import { ProductWithRelations, UserInformation } from "@/lib";
import Image from "next/image";
import { DeleteProduct } from "@/components/admin/utils/deleteProduct";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserRoles } from "@prisma/client";

interface ProductCardProps {
  product: ProductWithRelations;
  user: UserInformation;
}

export default function ProductCard({ product, user }: ProductCardProps) {
  return (
    <div
      key={product.id}
      className="bg-white dark:bg-gray-900 rounded-lg shadow p-6"
    >
      <Link prefetch={true} href={`/proizvodi/${product.id}`}>
        <Image
          src={
            product.images.length > 0
              ? product.images[0].imageUrl
              : "/placeholder.svg"
          }
          alt={product.name}
          loading="lazy"
          width={500}
          height={500}
          className="mb-4 w-full"
        />
      </Link>
      <h3 className="text-lg font-bold mb-2 dark:text-white">{product.name}</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-4">
        {product.description}
      </p>
      <div className="flex justify-between items-center">
        <span className="text-indigo-500 font-bold">
          {product.price ? `${product.price} RSD` : "N/A"}
        </span>
        {user.role == UserRoles.HeadAdmin && (
          <div className="flex space-x-2">
            <Link
              prefetch={true}
              href={`/admin-panel/proizvodi/edit/${product.id}`}
            >
              <Button className="text-indigo-300 hover:text-indigo-50">
                Edit
              </Button>
            </Link>
            <DeleteProduct id={product.id} />
          </div>
        )}
      </div>
    </div>
  );
}
