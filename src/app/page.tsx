import { getServerSession } from "next-auth";
import { UserRoles } from "@prisma/client";
import prisma from "../../prisma/client";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  console.log("session: ", session);

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

  console.log("user: ", user);

  if (!user || user.role !== UserRoles.HeadAdmin) {
    return redirect("/login");
  }

  return redirect("/dashboard");
}
