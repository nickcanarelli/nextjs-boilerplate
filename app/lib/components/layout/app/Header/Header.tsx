import Image from "next/image";
import { Admin, Logout } from "./AuthButtons";
import getCurrentUser from "@lib/actions/getCurrentUser";
import { use } from "react";
import { UserRole } from "@prisma/client";

export default function Header() {
  const user = use(getCurrentUser());
  const isAdmin = user?.role === UserRole.Admin;

  return (
    <div className="bg-surface py-5 px-9 flex max-h-20 justify-between">
      <Image
        src="https://tailwindui.com/img/logos/mark.svg?color=white"
        alt="Logo"
        width={32}
        height={32}
        style={{ width: "32px", height: "32px" }}
        priority
      />

      <div className="flex gap-x-4">
        {isAdmin ? <Admin /> : null}
        <Logout />
      </div>
    </div>
  );
}
