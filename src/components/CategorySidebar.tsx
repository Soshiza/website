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

interface CategorySidebarProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ categories, onSelectCategory }) => {
  return (
    <aside className="w-full md:w-64 md:fixed md:top-32 md:left-0 bg-gray-100 p-4 h-full md:h-auto">
      <h2 className={`text-5xl font-bold mb-4 text-center ${tangerine.className}`}>Trabajos Fotograficos</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category}
            className={`cursor-pointer hover:bg-gray-200 p-2 rounded ${tajawal.className}`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default CategorySidebar;
