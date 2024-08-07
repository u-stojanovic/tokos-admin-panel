"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { submitCreate } from "@/lib/actions/productActions";

import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CategoriesComboBox } from "@/components/ui/categories_combobox";
import UploadNewImage from "./uploadImage";
import { useImageUpload } from "@/context/ImageUploadContext";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "@/lib/configs/firebaseConfig";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Product description is required"),
  category: z.string().min(1, "Product category is required"),
  price: z.number().min(0, "Product price must be a positive number"),
});

type ProductFormInputs = z.infer<typeof productSchema>;

export default function NewProductForm() {
  const { images, removeImage } = useImageUpload();
  const { toast } = useToast();
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit: SubmitHandler<ProductFormInputs> = (data) => {
    mutation.mutate({ ...data, images: images.map((img) => img.url) });
  };

  const handleCategoryChange = (category: string) => {
    setValue("category", category);
  };

  const handleImageDelete = (filePath: string) => {
    if (filePath.startsWith("temp-images")) {
      const fileRef = ref(storage, filePath);
      deleteObject(fileRef)
        .then(() => {
          console.log(`Deleted ${filePath} successfully`);
          removeImage(filePath);
        })
        .catch((error) => {
          console.log(`Failed to delete ${filePath}`, error);
        });
    } else {
      // For URL-based images, just remove them from the state
      removeImage(filePath);
    }
  };

  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (img.filePath.startsWith("temp-images")) {
          handleImageDelete(img.filePath);
        }
      });
    };
  }, [images]);

  return (
    <div className="grid gap-4">
      <h1 className="font-bold text-2xl sm:text-3xl">Create Product</h1>
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
          <CategoriesComboBox onChange={handleCategoryChange} />
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
        <UploadNewImage />
        <div className="grid gap-2">
          <Label htmlFor="uploadedImages" className="text-base">
            Uploaded Images
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <Image
                  width={100}
                  height={100}
                  src={img.url}
                  alt={`Uploaded ${index}`}
                  className="w-full h-auto"
                />
                <Button
                  size="icon"
                  className="absolute top-0 right-0 bg-red-600 text-white p-1"
                  onClick={() => handleImageDelete(img.filePath)}
                >
                  <FaTrash />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <Button size="lg" type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating..." : "Create Product"}
        </Button>
      </form>
    </div>
  );
}
