"use client";
import { useCategoryDataStore } from "@/modules/Category/store/useCategoriesDataStore";
import { useOrderSelectionStore } from "../store/useOrderSelectionStore";

export default function MenuPageCategories() {
  const all = {
    id: "oo",
    name: "all"
  }
  const {categories} = useCategoryDataStore()
  const {changeSelectedCategory, selectedCategory} = useOrderSelectionStore()
  return (
      <div className="overflow-x-auto px-4 bg-white py-2 shadow border-y border-gray-200 scrollbar-hide whitespace-nowrap flex gap-3 scroll-smooth snap-x snap-mandatory scrollbar-hide">
        {categories && [all, ...categories].map((category, idx) => (
          <div
            onClick={() => changeSelectedCategory(category.name.toLocaleLowerCase())}
            key={idx}
            className={`snap-start capitalize shrink-0 active:scale-90 px-6 py-3 select-none rounded-full  text-xs font-medium cursor-pointer duration-200 ${
              selectedCategory.toLocaleLowerCase() == category.name.toLocaleLowerCase()
                ? "bg-blue-600 shadow-md text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            {category.name}
          </div>
        ))}
    </div>
  );
}
