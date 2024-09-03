import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { deleteIngredient } from "@/lib/actions/ingredientsActions";
import { Ingredient } from "@prisma/client";

export const useDeleteIngredientMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: { id: number }) => deleteIngredient(data),
    onSuccess: (result: Ingredient | string) => {
      if (typeof result === "string" && result === "Ingredient not found") {
        toast({
          title: "Warning",
          description: "Ingredient not found",
        });
      } else {
        queryClient.invalidateQueries({ queryKey: ["ingredients"] });
        toast({
          title: "Success",
          description: `Ingredient ${(result as Ingredient).name} successfully removed`,
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to delete ingredient",
      });
      console.log("Error deleting ingredient:", error);
    },
  });
};
