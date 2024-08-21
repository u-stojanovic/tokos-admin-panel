import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import {
  deleteCategory,
  DeleteCategoryResult,
} from "../../actions/categoriesActions";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (categoryId: number) => deleteCategory(categoryId),
    onSuccess: (result: DeleteCategoryResult) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        toast({
          title: "Success",
          description: result.message,
        });
      } else {
        toast({
          title: "Warning",
          description: result.message,
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to delete category",
      });
      console.log("error: ", error);
    },
  });
};
