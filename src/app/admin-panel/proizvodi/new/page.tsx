import NewProductForm from "./form";

export default async function NewProduct() {
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <NewProductForm />
    </div>
  );
}
