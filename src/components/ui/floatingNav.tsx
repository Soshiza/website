"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import Link from "next/link";
import Image from "next/image";
import EmailForm from "@/components/emailForm";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const [showContact, setShowContact] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{
            opacity: 1,
            y: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "flex max-w-full lg:max-w-fit fixed top-2 md:top-5 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-lg z-[5000] pr-2 md:pr-3 pl-3 md:pl-10 py-1 md:py-1 items-center justify-center gap-4 lg:gap-2", // Ajustes de ancho y separación solo en móvil
            className
          )}
        >
          <div className="filter brightness-0">
            <Image src="/soshiza.png" alt="Logo" width={50} height={50} className="w-10 h-10 md:w-20 md:h-20" />
          </div>
          {navItems.map((navItem: any, idx: number) => (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className={cn(
                "relative dark:text-neutral-50 items-center flex space-x-2 lg:space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 text-sm md:text-lg"
              )}
            >
              <span className="w-6 h-6 md:w-8 md:h-8">{navItem.icon}</span> {/* Ajustar íconos */}
              <span className="hidden sm:block">{navItem.name}</span>
            </Link>
          ))}
          <button 
            onClick={() => setShowContact(!showContact)} 
            className="border text-sm md:text-lg font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 md:px-6 md:py-3 rounded-full"
          >
            <span>Contacto</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px z-50" />
          </button>
        </motion.div>
      </AnimatePresence>
      {showContact && <EmailForm onClose={() => setShowContact(false)} />}
    </>
  );
};
