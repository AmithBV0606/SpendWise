"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  { label: "Dashboard", path: "/app/dashboard" },
  { label: "Account", path: "/app/account" },
];

export default function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="flex items-center border-b border-white/25 py-4">
      <Link href={"/app/dashboard"}>
        <Image
          src={"/Logo.png"}
          alt="Logo"
          width={25}
          height={25}
          className="cursor-pointer w-10 border border-white rounded-full"
        />
      </Link>

      <nav className="ml-auto">
        <ul className="flex gap-2 text-xs">
          {routes.map((route) => (
            <li key={route.path}>
              <Link
                href={route.path}
                className={`px-2 py-2 hover:text-white transition text-white/100 rounded-sm cursor-pointer ${
                  route.path === pathname ? "bg-white/20" : ""
                }`}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <LogoutLink className="text-white/70 text-[12px] ml-[10px]">
        Logout
      </LogoutLink>
    </header>
  );
}