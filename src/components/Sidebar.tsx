"use client";
import {
  Grid3x3Icon,
  HomeIcon,
  SettingsIcon,
  BarChartIcon,
  HistoryIcon,
  Bell,
} from "lucide-react";
import { MdOutlineBorderColor } from "react-icons/md";
import { FaDropbox } from "react-icons/fa";
import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { usePathname } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();

  const isActive = (path: string) =>
    pathname === path
      ? "bg-gray-800 text-white"
      : "text-gray-400 hover:bg-gray-800 hover:text-white";

  return (
    <aside className="group relative flex h-screen w-16 flex-col items-center bg-gray-900 transition-all duration-300 hover:w-64 dark:bg-gray-950">
      <Link
        className="flex h-16 w-full items-center justify-center border-b border-gray-800 dark:border-gray-800"
        href="#"
      >
        <Image src="/logo.png" width={70} height={70} alt="Logo" />

        <span className="ml-2 text-lg font-semibold text-white group-hover:block hidden transition-opacity delay-300 duration-500">
          Tokos
        </span>
      </Link>
      <nav className="flex flex-1 flex-col items-start justify-start gap-2 overflow-auto p-4">
        <Link
          className={`flex w-full items-center gap-4 rounded-md px-4 py-2 transition-colors ${isActive("/")}`}
          href="/"
        >
          <HomeIcon className="h-5 w-5" />
          <span className="group-hover:block hidden transition-opacity delay-300 duration-500">
            Dashboard
          </span>
        </Link>
        <Link
          className={`flex w-full items-center gap-4 rounded-md px-4 py-2 transition-colors ${isActive("/dashboard")}`}
          href="/dashboard"
        >
          <MdOutlineBorderColor className="h-5 w-5" />
          <span className="group-hover:block hidden transition-opacity delay-300 duration-500">
            Porudzbine
          </span>
        </Link>
        <Link
          className={`flex w-full items-center gap-4 rounded-md px-4 py-2 transition-colors ${isActive("/improvements")}`}
          href="/improvements"
        >
          <FaDropbox className="h-5 w-5" />
          <span className="group-hover:block hidden transition-opacity delay-300 duration-500">
            Proizvodi
          </span>
        </Link>

        <Link
          className={`flex w-full items-center gap-4 rounded-md px-4 py-2 transition-colors ${isActive("/history")}`}
          href="/history"
        >
          <HistoryIcon className="h-5 w-5" />
          <span className="group-hover:block hidden transition-opacity delay-300 duration-500">
            Istorija
          </span>
        </Link>

        <Link
          className={`flex w-full items-center gap-4 rounded-md px-4 py-2 transition-colors ${isActive("/settings")}`}
          href="/settings"
        >
          <SettingsIcon className="h-5 w-5" />
          <span className="group-hover:block hidden transition-opacity delay-300 duration-500">
            Podešavanja
          </span>
        </Link>
        <Link
          className={`flex w-full items-center gap-4 rounded-md px-4 py-2 transition-colors ${isActive("/settings")}`}
          href="/notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="group-hover:block hidden transition-opacity delay-300 duration-500">
            Notifikacije
          </span>
        </Link>
      </nav>
      <div className="flex flex-col items-center p-4 border-t border-gray-800 dark:border-gray-800 w-full transition-all">
        {isLoading && !(pathname === "/") && (
          <div className="animate-spin rounded-full h-7 w-7 mx-auto my-2 border-b-2 border-gray-700 dark:border-white/50"></div>
        )}
        {user?.picture && (
          <Image
            src={user.picture}
            alt="Profile picture"
            className="rounded-full"
            loading="lazy"
            width={50}
            height={50}
          />
        )}
        {user && !user.picture && (
          <div className="h-7 w-7 rounded-full mx-auto my-2 bg-gray-800 text-white text-xs flex justify-center items-center">
            {user?.given_name?.[0]}
          </div>
        )}
        {user?.email && (
          <p className="group-hover:block hidden text-center text-white text-xs mb-3 transition-opacity delay-300 duration-500">
            Logged in as {user.email}
          </p>
        )}
        {isAuthenticated && (
          <LogoutLink>
            <span className="group-hover:block text-red-500 font-bold hidden transition-opacity delay-300 duration-500">
              Log out
            </span>
          </LogoutLink>
        )}
      </div>
    </aside>
  );
}
