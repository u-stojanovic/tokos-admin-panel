"use client";

import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { submitCreate } from "@/lib/actions/productActions";
import { Ingredient } from "@prisma/client";
import { CheckedState } from "@radix-ui/react-checkbox";

import { ProductNameInput } from "./components/ProductNameInput";
import { ProductDescriptionInput } from "./components/ProductDescriptionInput";
import { ProductCategoryInput } from "./components/ProductCategoryInput";
import { ProductIngredientsInput } from "./components/ProductIngredientsInput";
import { ProductPriceInput } from "./components/ProductPriceInput";
import { UploadedImages } from "./components/UploadedImages";
import UploadNewImage from "./uploadImage";

import { useImageUpload } from "@/context/ImageUploadContext";
import { useSelectIngredients } from "@/context/ProductIngredientsSelectContext";
import { Button } from "@/components/ui/button";
import { storage } from "@/lib/configs/firebaseConfig";
import { ref, deleteObject } from "firebase/storage";

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
});

type ProductFormInputs = z.infer<typeof productSchema>;

interface NewProductFormProps {
  ingredients: Ingredient[];
}

export default function NewProductForm({ ingredients }: NewProductFormProps) {
  const { images, removeImage } = useImageUpload();
  const { addedIngredients, addIngredient, removeIngredient } =
    useSelectIngredients();

  const { toast } = useToast();

  const methods = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
  });

  const handleCheckChange = (checked: CheckedState, ingredient: Ingredient) => {
    if (checked === true) {
      addIngredient(ingredient.name, ingredient.isAlergen);
    } else if (checked === false) {
      removeIngredient(ingredient.name);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) => submitCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Product Created",
        description: "Product Successfully created",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to create a product",
      });
      console.log("error: ", error);
    },
  });

  const onSubmit: SubmitHandler<ProductFormInputs> = (data) => {
    if (addedIngredients.length === 0) {
      toast({
        title: "Error",
        description: "At least one ingredient must be selected",
      });
      return;
    }
    mutation.mutate({
      ...data,
      images: images.map((img) => img.url),
      addedIngredients,
    });
  };

  const handleCategoryChange = (category: string) => {
    methods.setValue("category", category);
  };

  React.useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (img.filePath.startsWith("temp-images")) {
          const fileRef = ref(storage, img.filePath);
          deleteObject(fileRef)
            .then(() => {
              console.log(`Deleted ${img.filePath} successfully`);
              removeImage(img.filePath);
            })
            .catch((error) => {
              console.log(`Failed to delete ${img.filePath}`, error);
            });
        }
      });
    };
  }, [images, removeImage]);

  return (
    <div className="grid gap-4">
      <h1 className="font-bold text-2xl sm:text-3xl">Create Product</h1>
      <FormProvider {...methods}>
        <form
          className="grid gap-4 md:gap-6"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <ProductNameInput />
          <ProductDescriptionInput />
          <ProductCategoryInput handleCategoryChange={handleCategoryChange} />
          <ProductIngredientsInput
            ingredients={ingredients}
            handleCheckChange={handleCheckChange}
          />
          <ProductPriceInput />
          <UploadNewImage />
          <UploadedImages />
          <Button size="lg" type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Creating..." : "Create Product"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
