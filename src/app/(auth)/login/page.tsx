import { getUserAndRole } from "@/lib/auth/authUtils";
import { redirect } from "next/navigation";
import LoginForm from "./form";
import { UserRoles } from "@prisma/client";

export default async function LoginPage() {
  const { user } = await getUserAndRole();
  if (!user) return <LoginForm />;

  if (user && !user.isActive) {
    return redirect("/failed-verification");
  }

  switch (user.role) {
    case UserRoles.HeadAdmin:
      return redirect("/");
    case UserRoles.Worker:
      return redirect("/");
    default:
      return <LoginForm />;
  }
}
