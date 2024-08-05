import { getProductById } from "@/lib/actions/productActions";
import ProductDetails from "./ProductDetails";

export default async function ProductSlug({
  params,
}: {
  params: { id: number };
}) {
  const product = await getProductById(params.id);

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
    <div className="flex flex-col items-center justify-center m-4">
      <div className="inline-block rounded-lg bg-lightMode-primary px-3 py-1 text-sm dark:bg-darkMode-primary text-lightMode-text">
        {product.name}
      </div>
      <ProductDetails product={product} />
    </div>
  );
}
