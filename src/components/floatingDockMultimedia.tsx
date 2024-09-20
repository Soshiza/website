import React from "react";
import { FloatingDockLinks } from "@/components/ui/floating-dockMultimedia";
import {
  IconPhoto,
  IconBriefcase,
  IconArticle,
  IconBrandApplePodcast,
} from "@tabler/icons-react";
import Image from "next/image";

export function FloatingDockMultimedia() {
  const links = [
    {
      title: "Galería",
      icon: (
        <IconPhoto className="h-6 w-6 text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/multimedia/gallery",
    },
    {
      title: "Proyectos",
      icon: (
        <IconBriefcase className="h-6 w-6 text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/multimedia/projects",
    },
    {
      title: "Soshiza",
      icon: (
        <div className="h-full w-full flex justify-center items-center">
          <Image
            src="/soshiza.png"
            width={24}  // Ajuste de tamaño para consistencia
            height={24}
            alt="Soshiza Logo"
            className="object-contain filter brightness-0"
          />
        </div>
      ),
      href: "/",
    },
    {
      title: "Blog",
      icon: (
        <IconArticle className="h-6 w-6 text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/multimedia/blog",
    },
    {
      title: "Podcast",
      icon: (
        <IconBrandApplePodcast className="h-6 w-6 text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/multimedia/podcast",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] flex justify-center bg-gray-50 dark:bg-neutral-800 shadow-lg py-3">
      <FloatingDockLinks
        desktopClassName="hidden md:flex gap-6"
        mobileClassName="flex md:hidden gap-6"
        items={links}
      />
    </div>
  );
}