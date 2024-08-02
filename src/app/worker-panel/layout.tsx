import WorkerSidebar from "@/components/workers/Sidebar";
import { getUserAndRole } from "@/lib/auth/authUtils";
import { redirect } from "next/navigation";
import { UserRoles } from "@prisma/client";

export default async function WorkerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, redirectPath } = await getUserAndRole();

  if (!user) return redirect("/login");

  if (redirectPath) {
    return redirect(redirectPath);
  }

  switch (user.role) {
    case UserRoles.Worker:
      return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-800">
          <WorkerSidebar />
          <div className="flex-1 p-8">{children}</div>
        </div>
      );
    case UserRoles.HeadAdmin:
      return redirect("/admin-panel/dashboard");
    default:
      return redirect("/login");
  }
}
