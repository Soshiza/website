import React from 'react';

interface CategorySidebarProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ categories, onSelectCategory }) => {
  return (
    <aside className="w-full md:w-64 bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Categorías</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category}
            className="cursor-pointer hover:bg-gray-200 p-2 rounded"
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
