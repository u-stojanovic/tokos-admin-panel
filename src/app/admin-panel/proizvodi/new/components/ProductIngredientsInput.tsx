import React from "react";
import { Ingredient } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ProductIngredientsProps {
  ingredients: Ingredient[];
  handleCheckChange: (checked: CheckedState, ingredient: Ingredient) => void;
}

export const ProductIngredientsInput: React.FC<ProductIngredientsProps> = ({
  ingredients,
  handleCheckChange,
}) => {
  return (
    <div className="grid gap-4">
      <Label htmlFor="productIngredients" className="text-lg font-semibold">
        Product Ingredients
      </Label>
      <div className="bg-white p-4 rounded-lg shadow">
        {ingredients.map((ingredient: Ingredient) => (
          <div
            key={ingredient.id}
            className="flex items-center justify-between py-2 border-b last:border-none"
          >
            <div className="flex items-center gap-2">
              <Checkbox
                onCheckedChange={(checked) =>
                  handleCheckChange(checked, ingredient)
                }
              />
              <span className="text-base">{ingredient.name}</span>
            </div>
            {ingredient.isAlergen && (
              <p className="text-red-600 text-sm">- Alergen</p>
            )}
          </div>
        ))}
      </div>
      <div className="bg-white p-4 rounded-lg shadow mt-4">
        <Input
          type="text"
          placeholder="Enter new ingredient"
          className="w-full p-2 border rounded mb-2"
        />
        <div className="flex items-center gap-2 mb-4">
          <Checkbox />
          <span>Check if allergen</span>
        </div>
        <Button size="default" className="w-full">
          Add New Ingredient
        </Button>
      </div>
    </div>
  );
};
