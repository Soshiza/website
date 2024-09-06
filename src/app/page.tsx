"use client";

import { motion } from "framer-motion";
import React from "react";
import { Tangerine } from "next/font/google";
import { Tajawal } from "next/font/google";
import { FloatingNavBar } from "@/components/floating-navbar";

const tangerine = Tangerine({
  subsets: ["latin"],
  weight: "700"
});

const tajawal =Tajawal({
  subsets: ["latin"],
  weight: "400"
})

export default function Home() {
  return (
    <>
      <FloatingNavBar />
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 py-20"
      >
        {/* Título principal con tamaño grande */}
        <h1 className={`text-[8rem] md:text-[12rem] font-bold dark:text-white text-center ${tangerine.className}`}>
          Soshiza
        </h1>
        
        {/* Subtítulo conciso y claro */}
        <p className={`font-light text-lg md:text-2xl dark:text-neutral-200 text-center max-w-2xl ${tajawal.className}`}>
          Agencia de Servicios Digitales en Chile. Especialistas en marketing digital, publicidad online, desarrollo de páginas web y fotografía profesional.
        </p>

        {/* Botones de llamada a la acción */}
        <div className="flex gap-4 mt-4">
          <a
            href="/services"
            className={`bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-6 py-3 hover:bg-neutral-800 dark:hover:bg-gray-300 transition-colors ${tajawal.className}`}
          >
            Conoce nuestros servicios
          </a>
          <a
            href="/contact"
            className={`border-2 border-black dark:border-white rounded-full w-fit text-black dark:text-white px-6 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${tajawal.className}`}
          >
            Contáctanos
          </a>
        </div>
      </motion.div>
    </>
  );
}
