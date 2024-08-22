import ProductDetails from "./ProductDetails";
import { getProductByIdConfig } from "@/lib/hooks/product/useGetProductById";
import { HydrationBoundary, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default async function Slug({ params }: { params: { id: number } }) {
  const { queryKey, queryFn } = getProductByIdConfig(params.id);
  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <HydrationBoundary>
        <ProductDetails id={params.id} />
      </HydrationBoundary>
    </div>
  );
}
