"use client";

import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ProductNameInput } from "../../../../components/admin/shared/form/ProductNameInput";
import { ProductDescriptionInput } from "../../../../components/admin/shared/form/ProductDescriptionInput";
import { ProductCategoryInput } from "../../../../components/admin/shared/form/ProductCategoryInput";
import { ProductIngredientsInput } from "../../../../components/admin/shared/form/ProductIngredientsInput";
import { ProductPriceInput } from "../../../../components/admin/shared/form/ProductPriceInput";
import { UploadedImages } from "./components/UploadedImages";
import UploadNewImage from "./components/uploadImage";
import { useProductCreationMutation } from "@/lib/hooks/product/useSubmitProductCreation";
import { useImageUpload } from "@/context/ImageUploadContext";
import { useSelectIngredients } from "@/context/ProductIngredientsSelectContext";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

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

export type ProductFormInputs = z.infer<typeof productSchema>;

export default function NewProductForm() {
  const { uploadImagesToFirebase } = useImageUpload();
  const mutation = useProductCreationMutation();
  const { addedIngredients } = useSelectIngredients();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const methods = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      subcategoryId: null,
      price: 0,
      addedIngredients: [],
      images: [],
    },
  });
  const { toast } = useToast();

  const onSubmit: SubmitHandler<ProductFormInputs> = async (data) => {
    setIsLoading(true);

    if (addedIngredients.length === 0) {
      toast({
        title: "Error",
        description: "At least one ingredient must be selected",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Upload new images and get their URLs
      const imageUrls = await uploadImagesToFirebase();

      // Combine existing images with new ones
      const allImageUrls = [...data.images, ...imageUrls];

      mutation.mutate(
        {
          ...data,
          images: allImageUrls,
          addedIngredients,
        },
        {
          onSuccess: () => {
            setIsLoading(false);
            toast({
              title: "Success",
              description: "Product created successfully",
            });
            methods.reset();
          },
          onError: (error) => {
            setIsLoading(false);
            toast({
              title: "Error",
              description: "Failed to create product",
            });
            console.error("Mutation error:", error);
          },
        },
      );
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to upload images",
      });
      console.error("Image upload error:", error);
    }
  };

  const onError = (errors: any) => {
    setIsLoading(false);
    toast({
      title: "Error",
      description: "Please fill out all of the necessary inputs",
    });
    console.error("Validation errors:", errors);
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
        Create Product
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
            <UploadNewImage />
            <Button
              size="lg"
              type="submit"
              disabled={mutation.isPending || isLoading}
            >
              {isLoading || mutation.isPending
                ? "Creating..."
                : "Create Product"}
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
