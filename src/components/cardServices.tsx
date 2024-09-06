"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";

export function CardServices() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      {/* Overlay con z-index alto */}
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 h-full w-full z-[999]"
          />
        )}
      </AnimatePresence>

      {/* Modal con z-index alto y sin botón en el modal */}
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[1000] p-4">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6 z-[1000]"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[350px] h-full md:h-fit md:max-h-[90%] mt-48 md:mt-0 sm:mt-0 flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden z-[1000]"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-40 sm:h-60 object-cover object-top"
                />
              </motion.div>

              <div className="p-4">
                <motion.h3
                  layoutId={`title-${active.title}-${id}`}
                  className="font-bold text-neutral-700 dark:text-neutral-200"
                >
                  {active.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${active.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 mt-2"
                >
                  {active.description}
                </motion.p>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Lista de tarjetas sin el título */}
      <ul className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mt-20 sm:mt-24">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 sm:p-6 flex flex-col justify-between bg-white dark:bg-neutral-800 rounded-lg shadow hover:shadow-lg cursor-pointer"
          >
            <motion.div layoutId={`image-${card.title}-${id}`}>
              <Image
                width={350}
                height={250}
                src={card.src}
                alt={card.title}
                className="h-40 sm:h-52 w-full rounded-lg object-cover object-top"
              />
            </motion.div>
            <div className="mt-4 sm:mt-6 text-center">
              <motion.button
                layoutId={`button-${card.title}-${id}`}
                className="mt-4 sm:mt-6 py-2 sm:py-3 px-6 rounded-full font-bold bg-green-500 text-white hover:bg-green-600 text-sm sm:text-base"
              >
                Leer más
              </motion.button>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Asesoramiento en marketing digital y publicidad online. Desarrollo de estrategias personalizadas para cada cliente. Implementación y seguimiento de las estrategias.",
    title: "Consultoria",
    src: "/consultoria.png",
    ctaText: "Leer más",
    ctaLink: "#",
    content: () => {
      return <p>Consultoria detallada para tu negocio.</p>;
    },
  },
  {
    description: "Diseño y desarrollo de sitios web responsive y optimizados para SEO. Creación de landing pages para campañas específicas. Mantenimiento y actualización de sitios web.",
    title: "Diseño Web",
    src: "/diseno-web.png",
    ctaText: "Leer más",
    ctaLink: "#",
    content: () => {
      return <p>Soluciones completas de diseño web.</p>;
    },
  },
  {
    description: "Creación y publicación de contenido atractivo. Implementación de estrategias de crecimiento de seguidores. Análisis de datos y generación de informes.",
    title: "Marketing en redes sociales",
    src: "/marketing.png",
    ctaText: "Leer más",
    ctaLink: "#",
    content: () => {
      return <p>Soluciones para crecimiento en redes sociales.</p>;
    },
  },
  {
    description: "Creación y gestión de campañas de publicidad en Google Ads, Facebook Ads, etc. Segmentación precisa de la audiencia objetivo. Optimización de las campañas para obtener el máximo retorno de la inversión (ROI).",
    title: "Publicidad online",
    src: "/publicidad-online.png",
    ctaText: "Leer más",
    ctaLink: "#",
    content: () => {
      return <p>Estrategias de publicidad optimizadas.</p>;
    },
  },
  {
    description: "Optimización del sitio web para los motores de búsqueda. Análisis de palabras clave y selección de las más relevantes. Implementación de estrategias de SEO on-page y off-page.",
    title: "SEO (Search Engine Optimization)",
    src: "/SEO.png",
    ctaText: "Leer más",
    ctaLink: "#",
    content: () => {
      return <p>Mejora tu presencia en motores de búsqueda.</p>;
    },
  },
  {
    description: "Creación de contenido original y atractivo para blogs, redes sociales, y sitio web. Redacción de artículos y publicaciones en blog Optimización del contenido para SEO.",
    title: "Marketing de contenidos",
    src: "/marketing-contenido.png",
    ctaText: "Leer más",
    ctaLink: "#",
    content: () => {
      return <p>Creación y optimización de contenido atractivo.</p>;
    },
  },
];
