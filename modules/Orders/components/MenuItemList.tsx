"use client";
import { useMemo } from "react";
import { useOrderSelectionStore } from "../store/useOrderSelectionStore";
import { useMenuItemDataStore } from "@/modules/MenuItems/store/useMenuItemsDataStore";
import MenuItemCard from "./MenuItemCard";

export default function MenuItemList() {
  const { menuItems } = useMenuItemDataStore();
  const { searchTerm, selectedCategory, filterMenuItems } = useOrderSelectionStore();
  const filteredItems = useMemo(() => {
    return filterMenuItems(menuItems);
  }, [menuItems, searchTerm, selectedCategory, filterMenuItems]);
  return (
    <div className="flex-1 p-4 flex flex-col overflow-y-auto">
      <div className="flex flex-col gap-5">
        {filteredItems.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">No items found.</p>
        ) : (
          filteredItems.map((menuItem) => (
            <MenuItemCard menuItem={menuItem} key={menuItem.id} />
          ))
        )}
      </div>
    </div>
  );
}
