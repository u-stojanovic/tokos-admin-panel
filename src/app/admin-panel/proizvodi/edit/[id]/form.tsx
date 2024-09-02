"use client";

import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import UploadNewImage from "../../new/components/uploadImage";
import { UploadedImages } from "../../new/components/UploadedImages";
import { ProductIngredientsInput } from "../../../../../components/admin/shared/form/ProductIngredientsInput";
import { EditProductImages } from "./components/EditProductImages";
import { useUpdateProduct } from "@/lib/hooks/product/useUpdateProduct";
import { useImageUpload } from "@/context/ImageUploadContext";
import { ProductNameInput } from "../../../../../components/admin/shared/form/ProductNameInput";
import { ProductDescriptionInput } from "@/components/admin/shared/form/ProductDescriptionInput";
import { ProductPriceInput } from "@/components/admin/shared/form/ProductPriceInput";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { ProductCategoryInput } from "@/components/admin/shared/form/ProductCategoryInput";
import { Product } from "@/lib";
import { useToast } from "@/components/ui/use-toast";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Product description is required"),
  categoryId: z.number(),
  subcategoryId: z.number().nullable(),
  price: z
    .number({ invalid_type_error: "Product price must be a number" })
    .min(0, "Product price must be a positive number"),
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
  const { images: newImages, uploadImagesToFirebase } = useImageUpload();

  const methods = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      categoryId: product.category.id,
      subcategoryId: product.subCategoryId || null,
      price: product.price || 0,
      addedIngredients: product.ingredients.map((prodIng) => ({
        name: prodIng.ingredient.name,
        isAlergen: prodIng.ingredient.isAlergen,
      })),
      images: product.images.map((image) => image.imageUrl),
    },
  });

  const updateProductMutation = useUpdateProduct({ productId: product.id });
  const { toast } = useToast();

  const onSubmit: SubmitHandler<ProductFormInputs> = async (data) => {
    try {
      setIsLoading(true);

      let newImageUrls: string[] = [];
      if (newImages.length > 0) {
        newImageUrls = await uploadImagesToFirebase();
      }

      const allImageUrls: string[] = [...data.images, ...newImageUrls];

      updateProductMutation.mutate(
        {
          ...data,
          images: allImageUrls,
        },
        {
          onSuccess: () => {
            setIsLoading(false);
            toast({
              title: "Success",
              description: "Product updated successfully",
            });
          },
          onError: (error) => {
            setIsLoading(false);
            toast({
              title: "Error",
              description: "Failed to update product",
            });
            console.error("Mutation error:", error);
          },
        },
      );
    } catch (error) {
      console.error("Failed to update product:", error);
      setIsLoading(false);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
      });
    }
  };

  const onError = (errors: any) => {
    console.error("Validation errors:", errors);
    toast({
      title: "Error",
      description: "Please correct the highlighted errors",
    });
  };

  return (
    <div className="grid gap-4 max-w-4xl mx-auto py-6">
      <Link
        href="/proizvodi"
        className="flex items-center text-blue-600 hover:underline mb-4"
      >
        <MdArrowBack className="mr-2" />
        Go back to product list
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
            <ProductCategoryInput />
            <ProductPriceInput />
            <EditProductImages product={product} />
            <UploadNewImage />
            <Button
              size="lg"
              type="submit"
              disabled={updateProductMutation.isPending || isLoading}
            >
              {isLoading || updateProductMutation.isPending
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
