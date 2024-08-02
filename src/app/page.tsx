import { getServerSession } from "next-auth";
import { UserRoles } from "@prisma/client";
import prisma from "../../prisma/client";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    return redirect("/login");
  }

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

  if (!user) {
    return redirect("/login");
  }

  switch (user.role) {
    case UserRoles.HeadAdmin:
      return redirect("/admin-panel/dashboard");
    case UserRoles.Worker:
      return redirect("/worker-panel/porudzbine");
    default:
      return redirect("/login");
  }
}
