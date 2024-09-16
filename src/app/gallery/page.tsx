'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '@/config/firebase';
import CategorySidebar from '@/components/CategorySidebar';
import DataSidebar from '@/components/Datasidebar';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import { FloatingNavBar } from '@/components/floating-navbar';
import { FloatingDockMultimedia } from '@/components/floatingDockMultimedia';
import { FaArrowLeft, FaArrowUp } from 'react-icons/fa'; // Importamos el ícono de flecha izquierda y arriba
import { Tangerine } from "next/font/google";
import { Tajawal } from "next/font/google";

const tangerine = Tangerine({
  subsets: ["latin"],
  weight: "700"
});

const tajawal =Tajawal({
  subsets: ["latin"],
  weight: "400"
});

interface ImageData {
  id: string;
  folderName: string;
  imageUrls: string[];
  title: string;
  author: string;
  company: string;
  description: string;
}

// Variantes para la animación de máquina de escribir
const typingEffect = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Retraso entre letras
    },
  },
};

// Variantes para las letras individuales
const letterVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Gallery = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [selectedImageData, setSelectedImageData] = useState<ImageData | null>(null);

  // Obtener categorías
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'Multimedia'));
        const data = querySnapshot.docs.map((doc) => doc.data() as ImageData);
        const uniqueCategories = Array.from(new Set(data.map((item) => item.folderName)));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };
    fetchCategories();
  }, []);

  // Manejar selección de categoría
  const handleSelectCategory = async (category: string) => {
    setSelectedCategory(category);
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(firestore, 'Multimedia'));
      const data = querySnapshot.docs
        .map((doc) => doc.data() as ImageData)
        .filter((item) => item.folderName === category);
      setImages(data);
    } catch (error) {
      console.error('Error al obtener imágenes:', error);
    }
    setLoading(false);
  };

  // Actualiza imageUrls cuando cambien las imágenes
  useEffect(() => {
    const urls = images.flatMap((imageData) => imageData.imageUrls);
    setImageUrls(urls);
  }, [images]);

  // Función para abrir el modal
  const handleImageClick = (index: number, imageData: ImageData) => {
    setPhotoIndex(index);
    setIsOpen(true);
    setSelectedImageData(imageData);
  };

  return (
    <>
      <FloatingNavBar />
      <div className="flex flex-col md:flex-row z-[100]">
        {/* Sidebar de Categorías */}
        <CategorySidebar categories={categories} onSelectCategory={handleSelectCategory} />

        {/* Galería */}
        <main className="flex-1 p-4 md:pl-64 flex flex-col justify-center items-center pt-20 mb-20">
          {loading ? (
            <p>Cargando imágenes...</p>
          ) : selectedCategory ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.flatMap((imageData, dataIndex) =>
                imageData.imageUrls.map((url, index) => (
                  <motion.div
                    key={`${dataIndex}-${index}`}
                    className="relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Image
                      src={url}
                      alt={imageData.title}
                      width={500}
                      height={500}
                      className="w-full h-auto object-cover rounded cursor-pointer select-none"
                      draggable={false}
                      unoptimized
                      onClick={() => handleImageClick(index, imageData)}
                    />
                  </motion.div>
                ))
              )}
            </div>
          ) : (
            // Texto centrado con animación de máquina de escribir y los íconos según el tamaño de pantalla
            <>
              <motion.p
                className={`text-6xl text-center md:mr-48 mb-4 ${tangerine.className}`}
                initial="hidden"
                animate="visible"
                variants={typingEffect}
              >
                {/* Cada letra se anima por separado */}
                {"Selecciona uno de nuestros trabajos para ver las imágenes.".split("").map((char, index) => (
                  <motion.span key={index} variants={letterVariant}>
                    {char}
                  </motion.span>
                ))}
              </motion.p>

              {/* Flecha izquierda solo en pantallas grandes */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                className="hidden md:block text-3xl md:mr-48" // Se oculta en móviles, visible en pantallas medianas
              >
                <FaArrowLeft />
              </motion.div>

              {/* Flecha hacia arriba solo en pantallas móviles */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                className="block md:hidden text-3xl" // Visible en móviles, se oculta en pantallas medianas
              >
                <FaArrowUp />
              </motion.div>
            </>
          )}

          {/* Modal de imagen */}
          {isOpen && (
            <Lightbox
              open={isOpen}
              close={() => setIsOpen(false)}
              slides={imageUrls.map((url) => ({ src: url }))}
              index={photoIndex}
              on={{ view: ({ index }) => setPhotoIndex(index) }}
              plugins={[Zoom, Fullscreen, Slideshow]}
            />
          )}
        </main>

        {/* Data Sidebar */}
        <DataSidebar imageData={selectedImageData} />
      </div>
      <FloatingDockMultimedia />
    </>
  );
};

export default Gallery;
