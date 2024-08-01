import NextAuth from "next-auth";
import { authOptions } from "@/lib/configs/authConfig";

export default NextAuth(authOptions).auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
