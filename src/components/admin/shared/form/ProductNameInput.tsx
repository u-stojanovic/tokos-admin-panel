import React from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const ProductNameInput: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
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
        <span className="text-red-600">{(errors.name as any).message}</span>
      )}
    </div>
  );
};
