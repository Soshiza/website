"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { FaPodcast, FaBlog } from "react-icons/fa";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { GrGallery } from "react-icons/gr";

export const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

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
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -200, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed top-0 left-0 h-screen w-56 bg-white dark:bg-black z-50 shadow-md",
            "flex flex-col items-start justify-start space-y-4 p-4"
          )}
        >
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 mt-36"
            >
              {item.icon}
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {item.name}
              </span>
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
