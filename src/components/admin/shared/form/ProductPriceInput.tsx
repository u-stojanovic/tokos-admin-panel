import React from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const ProductPriceInput: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
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
        <span className="text-red-600">{(errors.price as any).message}</span>
      )}
    </div>
  );
};
