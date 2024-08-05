"use client";
import { HistoryIcon, Bell } from "lucide-react";
import { MdOutlineBorderColor } from "react-icons/md";
import { FaDropbox } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { UserInformation } from "@/lib";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

interface WorkerSidebarProps {
  user: UserInformation;
}

export default function WorkerSidebar({ user }: WorkerSidebarProps) {
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
          className={`flex w-full items-center gap-4 rounded-md px-4 py-2 transition-colors ${isActive("/worker-panel/porudzbine")}`}
          href="/worker-panel/porudzbine"
        >
          <MdOutlineBorderColor className="h-5 w-5" />
          <span className="group-hover:block hidden transition-opacity delay-300 duration-500">
            Porudzbine
          </span>
        </Link>
        <Link
          className={`flex w-full items-center gap-4 rounded-md px-4 py-2 transition-colors ${isActive("/proizvodi")}`}
          href="/proizvodi"
        >
          <FaDropbox className="h-5 w-5" />
          <span className="group-hover:block hidden transition-opacity delay-300 duration-500">
            Proizvodi
          </span>
        </Link>

        <Link
          className={`flex w-full items-center gap-4 rounded-md px-4 py-2 transition-colors ${isActive("/worker-panel/istorija")}`}
          href="/worker-panel/istorija"
        >
          <HistoryIcon className="h-5 w-5" />
          <span className="group-hover:block hidden transition-opacity delay-300 duration-500">
            Istorija
          </span>
        </Link>

        <Link
          className={`flex w-full items-center gap-4 rounded-md px-4 py-2 transition-colors ${isActive("/worker-panel/notifikacije")}`}
          href="/worker-panel/notifikacije"
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
