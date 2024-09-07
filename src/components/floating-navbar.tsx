"use client";
import React from "react";
import { FloatingNav } from "@/components/ui/floatingNav";
import { IoHomeOutline } from "react-icons/io5";
import { FcAbout } from "react-icons/fc";
import { MdWorkOutline } from "react-icons/md";
import { RiGalleryLine } from "react-icons/ri";

export function FloatingNavBar() {
  const navItems = [
    {
      name: "Inicio",
      link: "/",
      icon: <IoHomeOutline className="h-6 w-6 text-neutral-500 dark:text-white block lg:hidden" />, // Solo se muestra en móviles
    },
    {
      name: "Acerca de",
      link: "/about",
      icon: <FcAbout className="h-6 w-6 text-neutral-500 dark:text-white block lg:hidden" />, // Solo se muestra en móviles
    },
    {
      name: "Servicios",
      link: "/services",
      icon: <MdWorkOutline className="h-6 w-6 text-neutral-500 dark:text-white block lg:hidden" />, // Solo se muestra en móviles
    },
    {
      name: "Multimedia",
      link: "/multimedia",
      icon: <RiGalleryLine className="h-6 w-6 text-neutral-500 dark:text-white block lg:hidden" />, // Solo se muestra en móviles
    },
  ];
  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
