import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { acceptOrder } from "@/lib/actions/orderActions";

export const useAcceptOrderMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (order) => acceptOrder(order),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
        refetchType: "all",
      });
      toast({
        title: "Order Updated",
        description: "Order Successfully Accepted",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to assign order",
      });
      console.log("error: ", error);
    },
  });
};
