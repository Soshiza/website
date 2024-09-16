import React from 'react';
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
      <h2 className={`text-5xl font-bold mb-2 ${tangerine.className}`}>{imageData.title}</h2>
      <p className={`${tajawal.className}`}><strong>Autor:</strong> {imageData.author}</p>
      <p className={`${tajawal.className}`}><strong>Empresa:</strong> {imageData.company}</p>
      <p className={`${tajawal.className}`}><strong>Descripción:</strong> {imageData.description}</p>
    </div>
  );
};

export default DataSidebar;
