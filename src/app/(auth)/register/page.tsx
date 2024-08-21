import { getUserAndRole } from "@/lib/auth/authUtils";
import { redirect } from "next/navigation";
import RegisterForm from "./form";
import { UserRoles } from "@prisma/client";

export default async function RegisterPage() {
  const { user } = await getUserAndRole();

  if (!user) {
    return redirect("/login");
  }

  if (user.role === UserRoles.HeadAdmin) {
    return <RegisterForm />;
  }

  return redirect("/login");
}
