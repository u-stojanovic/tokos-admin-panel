import { Category, SubCategory } from "@prisma/client";
import { Trash } from "lucide-react";
import { TriggerModalNewCategory } from "./components/TriggerNewCategoryModalButton";
import { TriggerModalNewSubCategory } from "./components/TriggerNewSubCategoryModalButton";
import DeleteCategory from "./components/DeleteCategory";

export interface CategoryWithSubCategories extends Category {
  subCategory: SubCategory[];
}

interface Props {
  categories: CategoryWithSubCategories[];
}

export default function ListCategories({ categories }: Props) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Categories</h1>
        <TriggerModalNewCategory />
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
                <TriggerModalNewSubCategory categoryId={category.id} />
                <DeleteCategory categoryId={category.id} />
              </div>
            </div>
            {category.subCategory && category.subCategory.length > 0 && (
              <ul className="text-left pl-4">
                {category.subCategory.map((subCategory) => (
                  <li
                    key={subCategory.id}
                    className="flex justify-between items-center text-gray-700"
                  >
                    <span>- {subCategory.name}</span>
                    <DeleteCategory categoryId={subCategory.id} />
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
