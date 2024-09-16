import React from 'react';

interface ImageData {
  title: string;
  author: string;
  company: string;
  description: string;
}

interface DataSidebarProps {
  imageData: ImageData | null;
}

const DataSidebar: React.FC<DataSidebarProps> = ({ imageData }) => {
  if (!imageData) {
    return null;
  }

  return (
    <div className="w-full md:w-64 bg-white p-4 shadow-lg">
      <h2 className="text-2xl font-bold mb-2">{imageData.title}</h2>
      <p><strong>Autor:</strong> {imageData.author}</p>
      <p><strong>Empresa:</strong> {imageData.company}</p>
      <p><strong>Descripción:</strong> {imageData.description}</p>
    </div>
  );
};

export default DataSidebar;
