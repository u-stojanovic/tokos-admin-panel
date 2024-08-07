import NewProductForm from "./form";
import { getIngredients } from "@/lib/actions/ingredientsActions";

export default async function NewProduct() {
  const ingredients = await getIngredients();

  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-4">
      <NewProductForm ingredients={ingredients} />
    </div>
  );
}
