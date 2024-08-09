import React from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const ProductDescriptionInput: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
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
        <span className="text-red-600">
          {(errors.description as any).message}
        </span>
      )}
    </div>
  );
};
