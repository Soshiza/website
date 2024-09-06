"use client";
import React from "react";
import { FloatingNav } from "@/components/ui/floatingNav";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { IoHomeOutline } from "react-icons/io5";
import { FcAbout } from "react-icons/fc";
import Link from "next/link";

export function FloatingNavBar() {
  const navItems = [
    {
      name: "Inicio",
      link: "/",
      icon: <IoHomeOutline className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Acerca de",
      link: "/about",
      icon: <FcAbout className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Servicios",
      link: "/services",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
        name: "Multimedia",
        link: "/multimedia",
        icon: (
          <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
        ),
      },
  ];
  return (
    <div className="relative  w-full ">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
