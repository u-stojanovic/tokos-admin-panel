import { UserRoles } from "@prisma/client";
import { redirect } from "next/navigation";
import { getUserAndRole } from "@/lib/auth/authUtils";
import AdminLanding from "@/components/admin/AdminLanding";
import WorkerLanding from "@/components/workers/WorkersLanding";

export default async function Home() {
  const { user } = await getUserAndRole();
  if (!user) return redirect("/login");
  if (user && !user.isActive) return redirect("/failed-verification");

  switch (user.role) {
    case UserRoles.HeadAdmin:
      return <AdminLanding />;
    case UserRoles.Worker:
      return <WorkerLanding />;
    default:
      return redirect("/login");
  }
}
