'use client';

import React, { useState } from 'react';
import { storage, firestore } from '@/config/firebase'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';


const UploadImageForm: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [folderName, setFolderName] = useState('');
  const [imageDate, setImageDate] = useState('');
  const [author, setAuthor] = useState('');
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Maneja la selección de múltiples imágenes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSelectedImages(Array.from(files));
    }
  };

  const handleUpload = async () => {
    if (!folderName || !author || !company || !imageDate || !title || !description) {
      alert('Por favor, completa todos los campos antes de subir las imágenes.');
      return;
    }

    try {
      const imageUrls: string[] = [];

      for (const image of selectedImages) {
        const uniqueId = uuidv4();
        const storageRef = ref(storage, `${folderName}/${uniqueId}.webp`);
        const snapshot = await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(snapshot.ref);
        imageUrls.push(downloadURL);
      }

      // Aquí cambiamos la colección a 'Multimedia'
      const docRef = await addDoc(collection(firestore, 'Multimedia'), {
        folderName,
        author,
        company,
        dateTaken: imageDate,
        title,
        description,
        imageUrls,
        createdAt: dayjs().format()
      });

      console.log('Colección creada con ID:', docRef.id);
      alert('Imágenes subidas correctamente y datos guardados.');

      // Limpiar formulario
      setSelectedImages([]);
      setFolderName('');
      setAuthor('');
      setCompany('');
      setImageDate('');
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error subiendo las imágenes:', error);
      alert('Hubo un error al subir las imágenes.');
    }
  };

  return (
    <motion.div
      className="p-6 bg-white bg-opacity-30 backdrop-filter backdrop-blur-md rounded-lg shadow-lg max-w-2xl mx-auto mt-1"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Subir Imágenes</h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Nombre de la carpeta"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className="w-full p-3 rounded-lg bg-white bg-opacity-70 border-none focus:outline-none shadow-sm placeholder-gray-500"
        />
        <input
          type="text"
          placeholder="Autor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-3 rounded-lg bg-white bg-opacity-70 border-none focus:outline-none shadow-sm placeholder-gray-500"
        />
        <input
          type="text"
          placeholder="Empresa"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full p-3 rounded-lg bg-white bg-opacity-70 border-none focus:outline-none shadow-sm placeholder-gray-500"
        />
        <input
          type="date"
          placeholder="Fecha tomada"
          value={imageDate}
          onChange={(e) => setImageDate(e.target.value)}
          className="w-full p-3 rounded-lg bg-white bg-opacity-70 border-none focus:outline-none shadow-sm placeholder-gray-500"
        />
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg bg-white bg-opacity-70 border-none focus:outline-none shadow-sm placeholder-gray-500"
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded-lg bg-white bg-opacity-70 border-none focus:outline-none shadow-sm placeholder-gray-500"
        />

        <input
          type="file"
          accept="image/webp"
          multiple
          onChange={handleFileChange}
          className="w-full p-3 rounded-lg bg-white bg-opacity-70 border-none focus:outline-none shadow-sm"
        />

        {selectedImages.length > 0 && (
          <motion.button
            onClick={handleUpload}
            className="w-full py-3 bg-blue-500 text-white rounded-lg shadow-md focus:outline-none hover:bg-blue-600 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Subir Imágenes
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default UploadImageForm;
