"use client";

import React, { createContext, useContext, useState } from "react";

interface SelectProductIngredientsContextType {
  addedIngredients: { name: string; isAlergen: boolean }[];
  addIngredient: (name: string, isAlergen: boolean) => void;
  removeIngredient: (name: string) => void;
}

const SelectIngredientsContext = createContext<
  SelectProductIngredientsContextType | undefined
>(undefined);

export const AddSelectedIngredientsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [addedIngredients, setAddedIngredients] = useState<
    { name: string; isAlergen: boolean }[]
  >([]);

  const addIngredient = (name: string, isAlergen: boolean) => {
    setAddedIngredients((prevIngredients) => [
      ...prevIngredients,
      { name, isAlergen },
    ]);
  };

  const removeIngredient = (name: string) => {
    setAddedIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient.name !== name),
    );
  };

  return (
    <SelectIngredientsContext.Provider
      value={{ addedIngredients, addIngredient, removeIngredient }}
    >
      {children}
    </SelectIngredientsContext.Provider>
  );
};

export const useSelectIngredients = () => {
  const context = useContext(SelectIngredientsContext);
  if (!context) {
    throw new Error(
      "useSelectIngredients must be used within an AddSelectedIngredientsProvider",
    );
  }
  return context;
};
