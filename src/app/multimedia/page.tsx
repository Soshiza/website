"use client";

import '@/app/globals.css';
import React from "react";
import { FloatingNavBar } from "@/components/floating-navbar";
import { FloatingDockMultimedia } from '@/components/floatingDockMultimedia';
import { Tajawal } from "next/font/google";
import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa'; // Importa el ícono de flecha hacia abajo

const tajawal = Tajawal({
  subsets: ["latin"],
  weight: "400"
});

// Variantes de animación para la máquina de escribir
const typingEffect = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Intervalo entre letras
    }
  }
};

// Variantes para las letras individuales
const letterVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export default function Multimedia() {
  const text = "Por favor seleccione una de las opciones en la barra navegadora";

  return (
    <>
      <FloatingNavBar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        {/* Animación del subtítulo con efecto de máquina de escribir */}
        <motion.h2
          className={`text-4xl mb-4 text-center ${tajawal.className}`}
          initial="hidden"
          animate="visible"
          variants={typingEffect}
        >
          {/* Mapea cada letra del texto para aplicar la animación individualmente */}
          {text.split("").map((char, index) => (
            <motion.span key={index} variants={letterVariant}>
              {char}
            </motion.span>
          ))}
        </motion.h2>

        {/* Flecha que indica hacia abajo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="text-3xl mt-4"
        >
          <FaArrowDown /> {/* Ícono de flecha hacia abajo */}
        </motion.div>
      </div>
      <FloatingDockMultimedia />
    </>
  );
}
