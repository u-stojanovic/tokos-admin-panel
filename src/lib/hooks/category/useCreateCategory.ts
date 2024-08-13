import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { createCategory } from "../../actions/categoriesActions";

import { CategoryFormInputs } from "@/app/admin-panel/kategorije/components/TriggerNewCategoryModalButton";
import { Category } from "@prisma/client";

export const useCreateNewCategory = (categoryId?: number) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CategoryFormInputs) => createCategory(data, categoryId),
    onSuccess: (result: Category | string) => {
      if (typeof result === "string") {
        if (result === "Category Already Exists") {
          toast({
            title: "Warning",
            description: "Category already exists",
          });
        } else {
          toast({
            title: "Info",
            description: result,
          });
        }
      } else {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        toast({
          title: "Success",
          description: `Category ${(result as Category).name} added successfully`,
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to create category",
      });
      console.log("error: ", error);
    },
  });
};
