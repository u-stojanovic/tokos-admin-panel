import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { submitCreate } from "@/lib/actions/productActions";
import { ProductFormInputs } from "@/app/admin-panel/proizvodi/new/form";

export const useProductCreationMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: ProductFormInputs) => submitCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Product Created",
        description: "Product successfully created",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to create a product",
      });
      console.log("error: ", error);
    },
  });
};
