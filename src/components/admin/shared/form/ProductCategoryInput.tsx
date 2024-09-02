import React from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { CategoriesComboBox } from "@/components/ui/categories_combobox";

export const ProductCategoryInput: React.FC = () => {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleCategoryChange = (
    categoryId: number,
    subcategoryId: number | null,
  ) => {
    setValue("categoryId", categoryId);
    setValue("subcategoryId", subcategoryId);
  };

  return (
    <div className="grid gap-2">
      <Label htmlFor="productCategory" className="text-base">
        Product Category
      </Label>
      <CategoriesComboBox onChange={handleCategoryChange} />
      {errors.category && (
        <span className="text-red-600">{(errors.category as any).message}</span>
      )}
    </div>
  );
};
