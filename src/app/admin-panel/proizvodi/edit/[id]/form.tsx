"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { submitEdit } from "@/lib/actions/productActions";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CategoriesComboBox } from "@/components/ui/categories_combobox";
import { Product } from "@/lib";
import ProductImages from "./uploadImage";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Product description is required"),
  category: z.string().min(1, "Product category is required"),
  price: z.number().min(0, "Product price must be a positive number"),
});

type ProductFormInputs = z.infer<typeof productSchema>;

interface EditProductFormProps {
  product: Product;
}

export default function EditProductForm({ product }: EditProductFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: ProductFormInputs) => submitEdit(product.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Product Updated",
        description: "Product Successfully updated",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to update product",
      });
      console.log("error: ", error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      category: product.category.name,
      price: product.price || 0,
    },
  });

  const onSubmit: SubmitHandler<ProductFormInputs> = (data) => {
    mutation.mutate(data);
  };

  const handleCategoryChange = (category: string) => {
    setValue("category", category);
  };

  return (
    <div className="grid gap-4">
      <h1 className="font-bold text-2xl sm:text-3xl">Edit Product</h1>
      <form className="grid gap-4 md:gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <Label htmlFor="productName" className="text-base">
            Product Name
          </Label>
          <Input
            id="productName"
            {...register("name")}
            placeholder="Enter product name"
          />
          {errors.name && (
            <span className="text-red-600">{errors.name.message}</span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="productDescription" className="text-base">
            Product Description
          </Label>
          <Textarea
            id="productDescription"
            {...register("description")}
            placeholder="Enter product description"
          />
          {errors.description && (
            <span className="text-red-600">{errors.description.message}</span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="productCategory" className="text-base">
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
        <div className="grid gap-2">
          <Label htmlFor="productPrice" className="text-base">
            Product Price
          </Label>
          <Input
            id="productPrice"
            type="number"
            {...register("price", { valueAsNumber: true })}
            placeholder="Enter product price"
          />
          {errors.price && (
            <span className="text-red-600">{errors.price.message}</span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="productImages" className="text-base">
            Product Images
          </Label>
          <ProductImages product={product} />
        </div>
        <Button size="lg" type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Updating..." : "Edit Product"}
        </Button>
      </form>
    </div>
  );
}
