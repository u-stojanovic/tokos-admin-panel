"use client";

import React, { useState } from "react";
import { Ingredient } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAddIngredientMutation } from "@/lib/hooks/useIngredientCreationMutation";
import { useFetchIngredients } from "@/lib/hooks/useIngredientsFetch";

interface ProductIngredientsProps {
  handleCheckChange: (checked: CheckedState, ingredient: Ingredient) => void;
}

export const ProductIngredientsInput: React.FC<ProductIngredientsProps> = ({
  handleCheckChange,
}) => {
  const { data: ingredients, isLoading } = useFetchIngredients();

  const [newIngredientName, setNewIngredientName] = useState("");
  const [isAlergen, setIsAlergen] = useState(false);

  const { mutate: addIngredient, isPending } = useAddIngredientMutation();

  const handleAddIngredient = () => {
    if (newIngredientName.trim()) {
      addIngredient({ name: newIngredientName, isAlergen });
      setNewIngredientName("");
      setIsAlergen(false);
    }
  };

  return (
    <div className="grid gap-4">
      <Label htmlFor="productIngredients" className="text-lg font-semibold">
        Product Ingredients
      </Label>
      {isLoading ? (
        <div className="bg-white p-4 rounded-lg shadow">Loading...</div>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow">
          {ingredients &&
            ingredients.length > 0 &&
            ingredients.map((ingredient: Ingredient) => (
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
      )}
      <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow mt-4">
        <Label htmlFor="createNewIngredient" className="text-lg font-semibold">
          Create new Ingredient
        </Label>
        <Input
          type="text"
          value={newIngredientName}
          onChange={(e) => setNewIngredientName(e.target.value)}
          placeholder="Enter new ingredient"
          className="w-full p-2 border rounded mb-2"
        />
        <div className="flex items-center gap-2 mb-4">
          <Checkbox
            checked={isAlergen}
            onCheckedChange={(checked) => setIsAlergen(checked === true)}
          />
          <span>Check if allergen</span>
        </div>
        <Button
          type="button"
          onClick={handleAddIngredient}
          size="default"
          className="w-full"
          disabled={isPending}
        >
          {isPending ? "Adding..." : "Add New Ingredient"}
        </Button>
      </div>
    </div>
  );
};
