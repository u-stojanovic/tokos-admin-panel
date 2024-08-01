import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "../../../../prisma/client";
import RegisterForm from "./form";
import { UserRoles } from "@prisma/client";

export default async function RegisterPage() {
  const session = await getServerSession();

  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email as string,
      },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });

    if (!user || user.role !== UserRoles.HeadAdmin) {
      return <RegisterForm />;
      // NOTE: This needs to be uncommented later
      // return redirect("/login");
    }

    return <RegisterForm />;
  }

  return <RegisterForm />;
  // return redirect("/login");
}
