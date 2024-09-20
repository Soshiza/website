'use client'; // Para habilitar los hooks en la página

import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Importar Framer Motion
import { firestore, storage } from '@/config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const UploadProjectsForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      // Subir la imagen a Firebase Storage
      let imageUrl = '';
      if (image) {
        const storageRef = ref(storage, `projects/${image.name}`);
        const snapshot = await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      // Guardar los datos en Firestore
      const projectsCollection = collection(firestore, 'Projects');
      await addDoc(projectsCollection, {
        title,
        description,
        link,
        imageUrl,
      });

      alert('Trabajo subido exitosamente');
      setTitle('');
      setDescription('');
      setLink('');
      setImage(null);
    } catch (error) {
      console.error('Error subiendo el trabajo: ', error);
      alert('Hubo un error al subir el trabajo');
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      className="max-w-lg mx-auto mt-10 bg-gray-100 shadow-lg rounded-lg p-8"
      initial={{ opacity: 0, y: 50 }} // Estado inicial
      animate={{ opacity: 1, y: 0 }} // Estado animado
      transition={{ duration: 0.8, ease: 'easeInOut' }} // Configuración de la animación
    >
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Subir Nuevo Proyecto</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-600">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
            required
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-600">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
            required
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-600">Link</label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
            required
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-600">Imagen</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            className="mt-1 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-blue-700 hover:file:bg-gray-200"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className={`w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-medium focus:outline-none focus:ring-4 focus:ring-blue-300 transition ease-in-out duration-200 ${
              uploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={uploading}
          >
            {uploading ? 'Subiendo...' : 'Subir trabajo'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default UploadProjectsForm;
