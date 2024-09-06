"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import Image from "next/image";
import { FloatingNavBar } from "@/components/floating-navbar";



const content = [
  {
    title: "Acerca de Nosotros",
    description:
      "Somos una agencia de publicidad digital comprometida con la excelencia y la innovación. Nuestro enfoque integral y personalizado nos ha posicionado como líderes en la región, brindando soluciones que potencian la presencia online de nuestros clientes y los ayudan a alcanzar sus objetivos comerciales.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/soshiza2.png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Ricardo Bravo",
    description:
      "Ricardo Bravo, fotógrafo y productor audiovisual, es el corazón creativo de nuestra agencia. Su pasión por capturar la esencia de cada marca se refleja en imágenes impactantes que conectan con el público objetivo. Su experiencia y creatividad son pilares fundamentales en la creación de contenido visual de alta calidad que enriquece nuestras campañas de marketing.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/rebm.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Zury Martinez",
    description:
      "Zury Martinez, nuestra experta desarrolladora en marketing de redes sociales, aporta el componente estratégico esencial para el éxito de nuestras campañas. Su profundo conocimiento técnico y experiencia en marketing digital son clave para el desarrollo de estrategias efectivas que posicionan a nuestros clientes en el mundo online. Es la mente detrás de nuestras tácticas innovadoras y creativas.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        Zury Martinez
      </div>
    ),
  },
  {
    title: "Misión",
    description:
      "Nuestra misión es clara: ser el aliado estratégico de empresas locales y regionales en su camino hacia el éxito digital. Nos comprometemos a brindar soluciones integrales y personalizadas que fortalezcan su presencia online y les permitan alcanzar sus metas comerciales.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Misión
      </div>
    ),
  },
  {
    title: "Visión",
    description:
      "Nos proyectamos como el referente en publicidad digital, impulsando el crecimiento y éxito de nuestros clientes a través de estrategias innovadoras y creativas. Nos esforzamos por convertirnos en el socio estratégico preferido por las empresas que buscan destacar en el mundo digital.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Visión
      </div>
    ),
  },
];
export default function About() {
  return (
    <>
    <FloatingNavBar />
    <div className="mt-28">
      <StickyScroll content={content} />
    </div>
    </>
  );
}
