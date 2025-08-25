"use client";
import { useCategoryDataStore } from "../store/useCategoriesDataStore";
import CategoryItem from "./CategoryItem";
import { useCategorySelectionStore } from "../store/useCategoriesSelectionStore";
import { Plus } from "lucide-react";

export default function CategoryList() {
  const { filteredCategories } = useCategoryDataStore();
  const { setModal } = useCategorySelectionStore();
  const categories = filteredCategories();

  return (
    <div className="p-4 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 capitalize">
      <div
        onClick={() => setModal("create")}
        className="min-h-56 flex flex-col items-center justify-center 
             border-2 border-dashed border-blue-300 rounded-xl 
             bg-gradient-to-br from-blue-50 to-white 
             text-blue-600 hover:bg-blue-100 hover:border-blue-400 
             hover:shadow-lg transform transition-all duration-300 
             cursor-pointer active:scale-95"
      >
        <Plus size={48} strokeWidth={2.5} className="text-blue-500" />
        <span className="mt-3 text-lg font-semibold uppercase tracking-wide">
          Add Category
        </span>
      </div>
      {/* Categories */}
      {categories.map((category, index) => (
        <CategoryItem key={category.id} {...{ category, index }} />
      ))}
    </div>
  );
}
