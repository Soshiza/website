import React, { useState } from 'react';
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconPhoto,
  IconFileCode,
  IconArticle,
  IconMicrophone,
  IconLogout,
} from "@tabler/icons-react";
import { signOut } from 'firebase/auth';
import { authentication } from '@/config/firebase';
import { useRouter } from 'next/navigation';
import UploadImageForm from '@/components/uploadImageForm';
import UploadProjectsForm from '@/components/uploadProjectsForm';
import { Tangerine } from "next/font/google";

const tangerine = Tangerine({
  subsets: ["latin"],
  weight: "700"
});

// Contenedor para la galería y el formulario
const Galeria = () => (
  <div className="w-full flex flex-col items-center justify-center mt-20 mb-20"> {/* Ajustamos márgenes superior e inferior */}
    <h2 className={`text-7xl text-black text-center ${tangerine.className}`}>Galería</h2>
    <UploadImageForm /> {/* Formulario de subir imágenes dentro de la galería */}
  </div>
);

const Proyectos = () => (
  <div className="w-full flex flex-col items-center justify-center mt-20 mb-20"> {/* Ajustamos márgenes superior e inferior */}
    <h2 className={`text-7xl text-black text-center ${tangerine.className}`}>Proyectos</h2>
    <UploadProjectsForm /> 
  </div>
);
const Blog = () => <div>Componente de Blog</div>;
const Podcasts = () => <div>Componente de Podcasts</div>;

export function FloatingDockDemo() {
  const [activeComponent, setActiveComponent] = useState<string | null>(null); // Estado para controlar qué componente mostrar
  const router = useRouter();

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await signOut(authentication);
      router.push('/');
    } catch (error: any) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  const links = [
    {
      title: "Galeria",
      icon: <IconPhoto className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      onClick: () => setActiveComponent('galeria'),
    },
    {
      title: "Proyectos",
      icon: <IconFileCode className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      onClick: () => setActiveComponent('proyectos'),
    },
    {
      title: "Blog",
      icon: <IconArticle className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      onClick: () => setActiveComponent('blog'),
    },
    {
      title: "Podcasts",
      icon: <IconMicrophone className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      onClick: () => setActiveComponent('podcasts'),
    },
    {
      title: "Cerrar Sesión",
      icon: <IconLogout className="h-full w-full text-red-500" />,
      onClick: handleLogout,
    }
  ];

  // Renderizamos el componente correspondiente según el estado
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'galeria':
        return <Galeria />;
      case 'proyectos':
        return <Proyectos />;
      case 'blog':
        return <Blog />;
      case 'podcasts':
        return <Podcasts />;
      default:
        return <div>Selecciona una opción del dock.</div>;
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-transparent">
        {/* Ajustamos el Dock a la parte inferior con fixed y bottom-5 */}
        <div className="fixed bottom-5 z-[9999]">
          <FloatingDock items={links} />
        </div>
        <div className="mt-10">
          {renderActiveComponent()} {/* Mostrar el componente activo */}
        </div>
      </div>
    </>
  );
}
