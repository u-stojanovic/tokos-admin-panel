import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { addIngredient } from "@/lib/actions/ingredientsActions";
import { Ingredient } from "@prisma/client";

export const useCreateNewIngredientMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: { name: string; isAlergen: boolean }) =>
      addIngredient(data),
    onSuccess: (result: Ingredient | string) => {
      if (
        typeof result === "string" &&
        result === "Ingredient Already Exists"
      ) {
        toast({
          title: "Warning",
          description: "Ingredient already exists",
        });
      } else {
        queryClient.invalidateQueries({ queryKey: ["ingredients"] });
        toast({
          title: "Success",
          description: `Ingredient ${(result as Ingredient).name} added successfully`,
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to add ingredient",
      });
      console.log("Error adding ingredient:", error);
    },
  });
};
