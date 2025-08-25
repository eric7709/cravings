"use client";
import { Category } from "../types/category";
import { useCategorySelectionStore } from "../store/useCategoriesSelectionStore";
import { FaTrashAlt } from "react-icons/fa";
import { bgColors } from "@/modules/MenuItems/constants/bgColors";
import { useToggleMenuItemAvailability } from "@/modules/MenuItems/hooks/useMenuItemsServices";

type Props = {
  category: Category;
};

export default function CategoryItem({ category }: Props) {
  const { setModal, selectCategory, selectedCategory } = useCategorySelectionStore();

  return (
    <div
      onClick={() => {
        selectCategory(category);
        setModal("update");
      }}
      className={`w-full flex items-center justify-center h-56 p-3 bg-blue-950 text-white rounded-lg shadow-md hover:opacity-90 transition-all duration-200 cursor-pointer relative`}
    >
      {/* Delete Button */}
      <div
        onClick={(e) => {
          selectCategory(category);
          console.log(selectedCategory, "selectedCategory")
          setModal("delete");
          e.stopPropagation();
        }}
        className="h-7 w-7 bg-white rounded-full cursor-pointer absolute top-3 right-3 text-red-500 border-2 grid place-content-center transition-all duration-300 hover:bg-red-500 hover:text-white hover:scale-110 active:scale-95"
      >
        <FaTrashAlt className="text-sm" />
      </div>
      <p className="text-lg uppercase text-center font-semibold">
        {category.name}
      </p>
    </div>
  );
}
