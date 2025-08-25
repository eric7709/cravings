"use client";
import { useState } from "react";
import { useClickOutside } from "@/hooks/useOutsideClick";
import { useCategoryDataStore } from "@/modules/Category/store/useCategoriesDataStore";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useMenuItemDataStore } from "@/modules/MenuItems/store/useMenuItemsDataStore";

export default function CategoryDropdown() {
  const { categories } = useCategoryDataStore();
  const [opened, setOpen] = useState(false);
  const [active, setActive] = useState(0); // Default to first category or "All"
  const ref = useClickOutside(() => setOpen(false));
  const {setSelectedCategory} = useMenuItemDataStore()

  const categoryOptions = [
    { id: "", name: "All Categories" },
    ...categories,
  ];

  return (
    <div className="relative lg:w-48">
      <div
        onClick={() => setOpen(!opened)}
        className="flex select-none h-10 px-3 border-gray-200 border rounded-md text-sm items-center justify-between cursor-pointer hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium capitalize">
            {categoryOptions[active].name}
          </span>
        </div>
        {opened ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </div>
      <div
        ref={ref}
        className={`absolute bg-white top-[110%] w-full border-gray-200 border rounded-md shadow-md z-10 text-xs transition-all duration-200 ${
          opened ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <p className="text-[13px] p-2 font-normal border-gray-200 border-b">
          Select Category
        </p>
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {categoryOptions.map(({ id, name }, index) => (
            <div
              key={id || "all"}
              onClick={(e) => {
                setActive(index);
                setSelectedCategory(id);
                setOpen(false);
                e.stopPropagation();
              }}
              className={`flex p-2 hover:bg-blue-800 hover:text-white active:scale-[.98] duration-300 items-center cursor-pointer justify-between ${
                active === index ? "bg-blue-500 text-white" : ""
              }`}
            >
              <span className="capitalize font-medium">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}