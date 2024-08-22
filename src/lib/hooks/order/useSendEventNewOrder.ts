import { useToast } from "@/components/ui/use-toast";
import { getUserAndRole } from "@/lib/auth/authUtils";
import { UserRoles } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";

export async function NotifyUsers() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { user } = await getUserAndRole();

  toast({
    className: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
    title: "New Order",
    description: "A new order has been placed.",
    variant: "destructive",
  });

  queryClient.invalidateQueries({
    queryKey: ["orders"],
    refetchType: "all",
  });

  const path =
    user && user.role === UserRoles.HeadAdmin
      ? "/admin-panel/porudzbine"
      : "/worker-panel/porudzbine";

  redirect(path);
}
