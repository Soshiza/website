'use client';
import React, { useEffect, useState } from 'react';
import { PinContainer } from '@/components/ui/3d-pin';
import { firestore } from '@/config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FloatingNavBar } from '@/components/floating-navbar';
import { FloatingDockMultimedia } from '@/components/floatingDockMultimedia';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);

  // Obtener datos de Firestore
  useEffect(() => {
    const fetchProjects = async () => {
      const projectsCollection = collection(firestore, 'Projects');
      const projectsSnapshot = await getDocs(projectsCollection);
      const projectsData = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(projectsData);
    };

    fetchProjects();
  }, []);

  return (
    <>
      <FloatingNavBar />
      {/* Contenedor con h-full para que el contenido ocupe toda la pantalla y permita el scroll */}
      <div className="mt-28 lg:mt-36 h-full overflow-y-auto">
        {/* Aplicamos padding bottom para evitar que el floating dock se superponga al contenido */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-14 px-4 lg:px-12 pb-24">
          {projects.length > 0 ? (
            projects.map((project) => (
              <PinContainer
                key={project.id}
                title={project.link}
                href={project.link}
                className="w-full sm:w-[20rem] h-[20rem]"
                containerClassName="group"
              >
                <div className="flex basis-full flex-col p-4 tracking-tight text-black sm:basis-1/2 w-full sm:w-[20rem] h-[20rem]">
                  {/* Imagen del proyecto */}
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  {/* Título del proyecto */}
                  <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-black">
                    {project.title}
                  </h3>
                  {/* Descripción del proyecto */}
                  <div className="text-base !m-0 !p-0 font-normal">
                    <span className="text-slate-600">{project.description}</span>
                  </div>
                </div>
              </PinContainer>
            ))
          ) : (
            <div className="text-black">Cargando proyectos...</div>
          )}
        </div>
      </div>
      <FloatingDockMultimedia />
    </>
  );
}
