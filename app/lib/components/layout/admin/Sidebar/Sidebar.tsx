"use client";

import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "@lib/components/core";
import { Profile } from "./_components";
import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

interface SidebarProps {
  user?: any;
}

export default function Sidebar({ user }: SidebarProps) {
  const [showSidebar, setShowSidebar] = useState(true);

  console.log("user", user);

  return (
    <div
      className={clsx(
        "flex flex-col border-r border-divider transition-all duration-200 ease-in-out",
        showSidebar ? "w-[280px]" : "w-14"
      )}
    >
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div
        className={clsx(
          "flex grow flex-col overflow-y-auto overflow-x-hidden",
          {
            "px-3 py-4": !showSidebar,
            "px-4 py-6": showSidebar,
          }
        )}
      >
        <div
          className={clsx("flex items-center", {
            "flex-col divide-y divide-divider border-b border-divider pb-4":
              !showSidebar,
          })}
        >
          <div
            className={clsx("flex h-8 shrink-0 flex-1 items-center", {
              "pb-4": !showSidebar,
            })}
          >
            <Image
              src="https://tailwindui.com/img/logos/mark.svg?color=white"
              alt="Logo"
              width={32}
              height={32}
              style={{ width: "32px", height: "32px" }}
              priority
            />
          </div>
          <div
            className={clsx({
              "pt-4": !showSidebar,
            })}
          >
            <IconButton
              group="normal"
              variant="secondary"
              size="md"
              icon={faArrowRightToBracket}
              className={clsx({
                "rotate-180": showSidebar,
              })}
              onClick={() => setShowSidebar(!showSidebar)}
            />
          </div>
        </div>

        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {/* {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-800 text-white"
                            : "text-gray-400 hover:text-white hover:bg-gray-800",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        )}
                      >
                        <item.icon
                          className="h-6 w-6 shrink-0"
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    </li>
                  ))} */}
              </ul>
            </li>

            <li className="mt-auto">
              <Profile showSidebar={showSidebar} user={user} />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
