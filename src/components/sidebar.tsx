"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { FaPodcast, FaBlog } from "react-icons/fa";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { GrGallery } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";

export const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Manejo del clic fuera del sidebar para cerrarlo
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    }

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  // Cerrar el sidebar al hacer clic en un enlace
  const handleLinkClick = () => {
    setIsVisible(false);
  };

  const navItems = [
    {
      name: "Galeria",
      link: "/",
      icon: <GrGallery className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Proyectos",
      link: "/about",
      icon: <HiOutlineDocumentSearch className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Blog",
      link: "/services",
      icon: <FaBlog className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Podcast",
      link: "/multimedia",
      icon: <FaPodcast className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];

  return (
    <>
      {/* Ícono del menú con el texto "Menú" y animación pulse */}
      <motion.div
        className="fixed top-36 left-4 z-50 flex items-center p-2 bg-gray-200 dark:bg-gray-800 rounded-md cursor-pointer" // top-36 para 8rem de distancia desde la parte superior
        onClick={() => setIsVisible(true)}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1], opacity: [1, 0.8, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <GiHamburgerMenu className="h-6 w-6 text-black dark:text-white mr-2" />
        <span className="text-black dark:text-white font-medium">Menú</span>
      </motion.div>

      <AnimatePresence>
        {isVisible && (
          <>
            {/* Overlay para cerrar el sidebar al hacer clic fuera */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setIsVisible(false)}
            />

            {/* Sidebar */}
            <motion.div
              ref={sidebarRef}
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -200, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "fixed top-36 left-0 h-full w-64 bg-white dark:bg-black z-50 shadow-md",
                "flex flex-col items-start justify-start space-y-4 p-6"
              )}
            >
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  onClick={handleLinkClick}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  {item.icon}
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {item.name}
                  </span>
                </Link>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

