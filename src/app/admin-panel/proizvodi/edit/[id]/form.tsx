"use client";

import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CategoriesComboBox } from "@/components/ui/categories_combobox";
import { Product } from "@/lib";
import UploadNewImage from "../../new/components/uploadImage";
import { UploadedImages } from "../../new/components/UploadedImages";
import { ProductIngredientsInput } from "../../../../../components/admin/shared/form/ProductIngredientsInput";
import { EditProductImages } from "./components/EditProductImages";
import { useUpdateProduct } from "@/lib/hooks/useUpdateProduct";
import { useImageUpload } from "@/context/ImageUploadContext";
import { ProductNameInput } from "../../../../../components/admin/shared/form/ProductNameInput";
import { ProductDescriptionInput } from "@/components/admin/shared/form/ProductDescriptionInput";
import { ProductPriceInput } from "@/components/admin/shared/form/ProductPriceInput";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

// Define the schema
const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Product description is required"),
  category: z.string().min(1, "Product category is required"),
  price: z.number().min(0, "Product price must be a positive number"),
  addedIngredients: z
    .array(
      z.object({
        name: z.string(),
        isAlergen: z.boolean(),
      }),
    )
    .min(1, "At least one ingredient must be selected"),
  images: z.array(z.string()),
});

type ProductFormInputs = z.infer<typeof productSchema>;

interface EditProductFormProps {
  product: Product;
}

export default function EditProductForm({ product }: EditProductFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { images, uploadImagesToFirebase } = useImageUpload();

  const methods = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      category: product.category.name,
      price: product.price || 0,
      addedIngredients: product.ingredients.map((prodIng) => ({
        name: prodIng.ingredient.name,
        isAlergen: prodIng.ingredient.isAlergen,
      })),
      images: product.images.map((image) => image.imageUrl),
    },
  });
  const {
    formState: { errors },
    setValue,
  } = methods;

  const updateProductMutation = useUpdateProduct({ productId: product.id });

  const onSubmit: SubmitHandler<ProductFormInputs> = async (data) => {
    try {
      setIsLoading(true);

      let newImageUrls: string[] = [];
      if (images.length > 0) {
        newImageUrls = await uploadImagesToFirebase();
      }

      const allImageUrls: string[] = [...data.images, ...newImageUrls];

      updateProductMutation.mutate({
        ...data,
        images: allImageUrls,
      });
    } catch (error) {
      console.error("Failed to update product:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const onError = (errors: any) => {
    console.error("Validation errors:", errors);
  };

  const handleCategoryChange = (category: string) => {
    setValue("category", category);
  };

  return (
    <div className="grid gap-4 max-w-4xl mx-auto py-6">
      <Link
        href="/proizvodi"
        className="flex items-center text-blue-600 hover:underline mb-4"
      >
        <MdArrowBack className="mr-2" />
        Idite nazad na listu proizvoda
      </Link>
      <h1 className="font-bold text-2xl sm:text-3xl text-center">
        Edit Product
      </h1>
      <FormProvider {...methods}>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={methods.handleSubmit(onSubmit, onError)}
        >
          <div className="flex flex-col gap-6">
            <ProductNameInput />
            <ProductDescriptionInput />
            <div className="grid gap-2">
              <Label
                htmlFor="productCategory"
                className="text-base font-semibold"
              >
                Product Category
              </Label>
              <CategoriesComboBox
                currCategory={product.category.name}
                onChange={handleCategoryChange}
              />
              {errors.category && (
                <span className="text-red-600">{errors.category.message}</span>
              )}
            </div>
            <ProductPriceInput />
            <EditProductImages product={product} />
            <UploadNewImage />
            <Button
              size="lg"
              type="submit"
              disabled={updateProductMutation.isPending || isLoading}
            >
              {updateProductMutation.isPending || isLoading
                ? "Updating..."
                : "Update Product"}
            </Button>
          </div>
          <div className="flex flex-col gap-6">
            <ProductIngredientsInput />
            <UploadedImages />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
