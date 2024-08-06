"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib";
import ProductImages from "./uploadImage";

interface EditProductFormProps {
  product: Product;
}

// FIXME:
// Warning: You provided a `value` prop to a form field without an
// `onChange` handler.
// This will render a read-only field.
// If the field should be mutable use `defaultValue`.
// Otherwise, set either `onChange` or `readOnly`.

export default function EditProductForm({ product }: EditProductFormProps) {
  return (
    <div className="grid gap-4">
      <h1 className="font-bold text-2xl sm:text-3xl">Edit Product</h1>
      <form className="grid gap-4 md:gap-6">
        <div className="grid gap-2">
          <Label htmlFor="productName" className="text-base">
            Product Name
          </Label>
          <Input
            id="productName"
            value={product.name}
            placeholder="Enter product name"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="productDescription" className="text-base">
            Product Description
          </Label>
          <Textarea
            id="productDescription"
            value={product.description}
            placeholder="Enter product description"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="productCategory" className="text-base">
            Product Category
          </Label>
          <Input
            id="productCategory"
            value={product.category.name}
            placeholder="Enter product category"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="productPrice" className="text-base">
            Product Price
          </Label>
          <Input
            id="productPrice"
            value={product.price as number}
            placeholder="Enter product price"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="productPrice" className="text-base">
            Product Ingredients
          </Label>
          <Input
            id="productPrice"
            value={product.price as number}
            placeholder="Enter product price"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="productImages" className="text-base">
            Product Images
          </Label>
          <ProductImages product={product} />
        </div>
        <Button size="lg">Edit Product</Button>
      </form>
    </div>
  );
}
