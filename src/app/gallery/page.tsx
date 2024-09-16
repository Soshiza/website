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

interface ImageData {
  id: string;
  folderName: string;
  imageUrls: string[];
  title: string;
  author: string;
  company: string;
  description: string;
}

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
    <div className="flex flex-col md:flex-row z-[100]">
      {/* Sidebar de Categorías */}
      <CategorySidebar categories={categories} onSelectCategory={handleSelectCategory} />

      {/* Galería */}
      <main className="flex-1 p-4">
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
                    onClick={() => handleImageClick(index, imageData)}
                  />
                </motion.div>
              ))
            )}
          </div>
        ) : (
          <p>Selecciona una categoría para ver las imágenes.</p>
        )}

        {/* Modal de imagen */}
        {isOpen && (
          <Lightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            slides={imageUrls.map((url) => ({ src: url }))}
            index={photoIndex} // Controla el índice actual
            on={{ view: ({ index }) => setPhotoIndex(index) }} // Detecta cambios en el índice
            plugins={[Zoom, Fullscreen, Slideshow]}
          />
        )}
      </main>

      {/* Data Sidebar */}
      <DataSidebar imageData={selectedImageData} />
    </div>
  );
};

export default Gallery;
