"use client";

import EditProductForm from "./form";
import EditProductSkeletonLoader from "./components/SkeletonLoader";
import { useFetchProductById } from "@/lib/hooks/product/useGetProductById";

export default function ProductEditSlug({
  params,
}: {
  params: { id: number };
}) {
  const { data: product, isLoading } = useFetchProductById(params.id as number);

  if (isLoading) {
    return <EditProductSkeletonLoader />;
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center m-4">
        <h1 className="text-3xl font-bold text-lightMode-text dark:text-darkMode-text mb-6">
          Product not found
        </h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <EditProductForm product={product as any} />
    </div>
  );
}
