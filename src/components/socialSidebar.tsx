"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const socialLinks = [
  {
    title: "Facebook",
    icon: <FaFacebookF className="text-white w-5 h-5" />,
    link: "https://facebook.com",
  },
  {
    title: "WhatsApp",
    icon: <FaWhatsapp className="text-white w-5 h-5" />,
    link: "https://wa.me/123456789", // Cambia a tu número de WhatsApp
  },
  {
    title: "Instagram",
    icon: <FaInstagram className="text-white w-5 h-5" />,
    link: "https://instagram.com",
  },
];

const SocialSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLabel, setShowLabel] = useState(true);

  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;
    let reappearTimeout: NodeJS.Timeout;

    const startBlinking = () => {
      // Parpadeo inicial 3 veces
      let blinkCount = 0;
      const blinkInterval = setInterval(() => {
        setShowLabel((prev) => !prev);
        blinkCount += 1;
        if (blinkCount >= 6) { // Aparece y desaparece 3 veces
          clearInterval(blinkInterval);
          setShowLabel(false);
        }
      }, 500);
    };

    // Parpadeo inicial
    startBlinking();

    // Mostrar el letrero de nuevo después de 30 segundos
    reappearTimeout = setInterval(() => {
      setShowLabel(true);
      startBlinking();
    }, 30000);

    return () => {
      clearTimeout(blinkTimeout);
      clearTimeout(reappearTimeout);
    };
  }, []);

  return (
    <>
      {/* Sidebar para pantallas grandes */}
      <div className="hidden lg:flex fixed right-5 top-1/3 flex-col space-y-4 z-50">
        {socialLinks.map((social, index) => (
          <motion.a
            key={index}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="bg-black p-3 rounded-full shadow-lg cursor-pointer hover:bg-gray-600 transition-colors"
          >
            {social.icon}
          </motion.a>
        ))}
      </div>

      {/* Botón y sidebar para dispositivos móviles */}
      <div className="lg:hidden fixed right-4 bottom-4 z-50 flex items-center space-x-2">
        {/* Letrero que aparece temporalmente */}
        <AnimatePresence>
          {showLabel && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="bg-black text-white text-sm rounded-md px-3 py-1"
            >
              Redes Sociales
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botón flotante para abrir/cerrar el sidebar */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-black p-3 rounded-full shadow-lg cursor-pointer focus:outline-none"
        >
          {isOpen ? (
            <FiChevronRight className="text-white w-6 h-6" />
          ) : (
            <FiChevronLeft className="text-white w-6 h-6" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden fixed right-0 top-1/3 flex flex-col space-y-4 p-4 bg-transparent z-50 rounded-l-md"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="p-3 rounded-full bg-black shadow-lg hover:bg-gray-600 transition-colors"
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SocialSidebar;

