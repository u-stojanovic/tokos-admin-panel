import { getUserAndRole } from "@/lib/auth/authUtils";
import { redirect } from "next/navigation";
import { UserRoles } from "@prisma/client";
import AdminSidebar from "@/components/admin/Sidebar";

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
        <div className="flex h-screen bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <AdminSidebar user={user} />
          <div className="flex-1 overflow-auto p-8">{children}</div>
        </div>
      );
    case UserRoles.Worker:
      return redirect("/worker-panel/porudzbine");
    default:
      return redirect("/login");
  }
}