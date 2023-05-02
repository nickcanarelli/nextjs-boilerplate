"use client";

import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faPersonToPortal } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@lib/components/core";
import { Float } from "@headlessui-float/react";
import React, { Fragment, use } from "react";
import { signOut } from "next-auth/react";
import { Menu } from "@headlessui/react";
import Image from "next/image";
import clsx from "clsx";

interface ProfileProps {
  showSidebar: boolean;
  user?: any;
}

export default function Profile({ user, showSidebar }: ProfileProps) {
  return (
    <Menu
      as="div"
      className={clsx("relative", {
        "border-t border-light pt-6": !showSidebar,
      })}
    >
      {({ open }) => (
        <Float
          as={Fragment}
          show={open}
          placement={showSidebar ? "top" : "right-end"}
          offset={12}
          flip={12}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          adaptiveWidth={showSidebar}
          portal
        >
          <Menu.Button
            as="div"
            className={clsx("cursor-pointer flex", {
              "border p-2 flex-row justify-between items-center rounded":
                showSidebar,
              "bg-surface border-accent-primary": open,
              "border-light": !open && showSidebar,
            })}
          >
            <div
              className={clsx("flex flex-row gap-x-3 items-center shrink-0", {
                "-ml-[1px]": !showSidebar,
              })}
            >
              <Image
                className="rounded-full "
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
                width={showSidebar ? "40" : "32"}
                height={showSidebar ? "40" : "32"}
              />
              <div
                className={clsx("flex flex-col", {
                  hidden: !showSidebar,
                })}
              >
                <span className="sr-only">Your profile</span>
                <span
                  className="font-semibold text-sm text-primary"
                  aria-hidden="true"
                >
                  {user?.email}
                </span>
                <span className="text-secondary font-normal text-xs">
                  @tom_cook
                </span>
              </div>
            </div>
            <div
              className={clsx({
                hidden: !showSidebar,
              })}
            >
              <IconButton
                group="normal"
                variant="secondary-transparent"
                size="md"
                icon={faEllipsisVertical}
              />
            </div>
          </Menu.Button>
          <Menu.Items className="w-full bg-surface border border-light shadow-elevation-md rounded-xl outline-none ring-0">
            <div className="p-2">
              <Menu.Item
                as="div"
                className="text-primary text-sm leading-[22px] -tracking-[0.128px] flex w-full items-center rounded bg-transparent hover:bg-neutral-alpha-200 p-2 cursor-pointer transition-all duration-150"
              >
                Settings
              </Menu.Item>
              <Menu.Item
                as="div"
                className="text-primary text-sm leading-[22px] -tracking-[0.128px] flex w-full items-center rounded bg-transparent hover:bg-neutral-alpha-200 p-2 cursor-pointer transition-all duration-150"
              >
                Invite Members
              </Menu.Item>
            </div>
            <div className="p-2 border-t border-light">
              <Menu.Item
                as="div"
                className="text-primary text-sm leading-[22px] -tracking-[0.128px] flex gap-x-3 w-full items-center rounded bg-transparent hover:bg-neutral-alpha-200 p-2 cursor-pointer transition-all duration-150"
                onClick={() => signOut()}
              >
                <FontAwesomeIcon icon={faPersonToPortal} aria-hidden="true" />
                Log Out
              </Menu.Item>
            </div>
          </Menu.Items>
        </Float>
      )}
    </Menu>
  );
}
