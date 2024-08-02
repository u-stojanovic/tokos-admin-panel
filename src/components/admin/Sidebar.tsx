"use client";
import { HomeIcon, SettingsIcon, HistoryIcon, Bell } from "lucide-react";
import { MdOutlineBorderColor } from "react-icons/md";
import { FaDropbox } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { UserInformation } from "@/lib";

interface AdminSidebarProps {
  user: UserInformation;
}

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path
      ? "bg-gray-800 text-white"
      : "text-gray-400 hover:bg-gray-800 hover:text-white";

  return (
    <aside className="group relative flex h-screen w-16 flex-col items-center bg-gray-900 transition-all duration-300 hover:w-64 dark:bg-gray-950">
      <Link
        className="flex h-16 w-full items-center justify-center border-b border-gray-800 dark:border-gray-800"
        href="/"
      >
        <Image src="/logo.png" width={70} height={70} alt="Logo" />

        <span className="ml-2 text-lg font-semibold text-white group-hover:block hidden transition-opacity delay-300 duration-500">
          Tokos
        </span>
      </Link>
      <nav className="flex flex-1 flex-col items-start justify-start gap-2 overflow-auto p-4">
        <Link
          className={`flex w-full items-center gap-4 rounded-md px-4 py-2 transition-colors ${isActive("/admin-panel/dashboard")}`}
          href="/admin-panel/dashboard"
        >
          <HomeIcon className="h-5 w-5" />
          <span className="group-hover:block hidden transition-opacity delay-300 duration-500">
            Dashboard
          </span>
        </Link>
        <Link
          className={`flex w-full items-center gap-4 rounded-md px-4 py-2 transition-colors ${isActive("/admin-panel/porudzbine")}`}
          href="/admin-panel/porudzbine"
        >
          <MdOutlineBorderColor className="h-5 w-5" />
          <span className="group-hover:block hidden transition-opacity delay-300 duration-500">
            Porudzbine
          </span>
        </Link>
        <Link
          className={`flex w-full items-center gap-4 rounded-md px-4 py-2 transition-colors ${isActive("/admin-panel/proizvodi")}`}
          href="/admin-panel/proizvodi"
        >
          <FaDropbox className="h-5 w-5" />
          <span className="group-hover:block hidden transition-opacity delay-300 duration-500">
            Proizvodi
          </span>
        </Link>

        <Link
          className={`flex w-full items-center gap-4 rounded-md px-4 py-2 transition-colors ${isActive("/admin-panel/istorija")}`}
          href="/admin-panel/istorija"
        >
          <HistoryIcon className="h-5 w-5" />
          <span className="group-hover:block hidden transition-opacity delay-300 duration-500">
            Istorija
          </span>
        </Link>

        <Link
          className={`flex w-full items-center gap-4 rounded-md px-4 py-2 transition-colors ${isActive("/admin-panel/podesavanja")}`}
          href="/admin-panel/podesavanja"
        >
          <SettingsIcon className="h-5 w-5" />
          <span className="group-hover:block hidden transition-opacity delay-300 duration-500">
            Podešavanja
          </span>
        </Link>
        <Link
          className={`flex w-full items-center gap-4 rounded-md px-4 py-2 transition-colors ${isActive("/admin-panel/notifikacije")}`}
          href="/admin-panel/notifikacije"
        >
          <Bell className="h-5 w-5" />
          <span className="group-hover:block hidden transition-opacity delay-300 duration-500">
            Notifikacije
          </span>
        </Link>
      </nav>

      <div className="flex flex-col items-center p-4 border-t border-gray-800 dark:border-gray-800 w-full transition-all">
        {user?.email && (
          <p className="group-hover:block hidden text-center text-white text-xs mb-3 transition-opacity delay-300 duration-500">
            Logged in as {user.email}
          </p>
        )}
        <Button onClick={() => signOut()}>
          <span className="group-hover:block text-red-500 font-bold hidden transition-opacity delay-300 duration-500">
            Log out
          </span>
        </Button>
      </div>
    </aside>
  );
}
