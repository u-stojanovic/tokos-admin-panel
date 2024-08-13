import { Button } from "@/components/ui/button";
import { Category, SubCategory } from "@prisma/client";
import { Plus, Trash } from "lucide-react";

interface Props {
  categories: (Category & { subCategories: SubCategory[] })[];
}

export default function ListCategories({ categories }: Props) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
          + New Category
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-100 transition duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{category.name}</h2>
              <div className="flex items-center space-x-2">
                <button className="text-blue-500 hover:text-blue-600 transition duration-300">
                  <Plus size={20} />{" "}
                </button>
                <button className="text-red-500 hover:text-red-600 transition duration-300">
                  <Trash size={20} />
                </button>
              </div>
            </div>
            {category.subCategories && category.subCategories.length > 0 && (
              <ul className="text-left pl-4">
                {category.subCategories.map((subCategory) => (
                  <li
                    key={subCategory.id}
                    className="flex justify-between items-center text-gray-700"
                  >
                    <span>- {subCategory.name}</span>
                    <button className="text-red-500 hover:text-red-600 transition duration-300">
                      <Trash size={16} />{" "}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
