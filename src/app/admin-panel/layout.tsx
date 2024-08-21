import { getUserAndRole } from "@/lib/auth/authUtils";
import { redirect } from "next/navigation";
import { UserRoles } from "@prisma/client";
import AdminSidebar from "@/components/admin/Sidebar";
import { ImageUploadProvider } from "@/context/ImageUploadContext";
import { AddSelectedIngredientsProvider } from "@/context/ProductIngredientsSelectContext";
import { NewOrderProvider } from "@/lib/newOrderProvider";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, redirectPath } = await getUserAndRole();

  if (!user) return redirect("/login");

  if (user && !user.isActive) return redirect("/failed-verification");

  if (redirectPath) {
    return redirect(redirectPath);
  }

  switch (user.role) {
    case UserRoles.HeadAdmin:
      return (
        <ImageUploadProvider>
          <AddSelectedIngredientsProvider>
            {/* <NewOrderProvider> */}
            <div className="flex h-fit bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <AdminSidebar user={user} />
              <div className="flex-1 h-screen overflow-y-auto p-8">
                {children}
              </div>
            </div>
            {/* </NewOrderProvider> */}
          </AddSelectedIngredientsProvider>
        </ImageUploadProvider>
      );
    case UserRoles.Worker:
      return redirect("/worker-panel/porudzbine");
    default:
      return redirect("/login");
  }
}
