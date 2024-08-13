import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { submitEdit } from "@/lib/actions/productActions";
import { ProductFormInputs } from "@/app/admin-panel/proizvodi/new/form";

interface Props {
  productId: number;
}

export const useUpdateProduct = ({ productId }: Props) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: ProductFormInputs) => submitEdit(productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Product Updated",
        description: "Product Successfully updated",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to update product",
      });
      console.log("error: ", error);
    },
  });
};
