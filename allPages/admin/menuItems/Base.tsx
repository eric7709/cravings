"use client";
import MenuItemHeader from "@/modules/MenuItems/components/MenuItemHeader";
import AdminMenuItemList from "@/modules/MenuItems/components/AdminMenuItemList";
import DeleteMenuItem from "@/modules/MenuItems/components/DeleteMenuItem";
import { useSyncMenuItemsDataStore } from "@/modules/MenuItems/hooks/useSyncMenuItemsDataStore";
import { useSyncCategoryDataStore } from "@/modules/Category/hooks/useSyncCategoryDataStore";
import { useSyncEmployeesDataStore } from "@/modules/Employees/hooks/useSyncEmployeesDataStore";
import CreateMenuItemModal from "@/modules/MenuItems/components/CreateMenuItemModal";
import UpdateMenuItemModal from "@/modules/MenuItems/components/UpdateMenuItemModal";

export default function Base() {
  useSyncMenuItemsDataStore();
  useSyncCategoryDataStore();
  useSyncEmployeesDataStore();
  return (
    <div className="h-screen flex flex-col">
      <MenuItemHeader />
      <div className="flex-1 scrollbar-hide overflow-y-auto">
        <CreateMenuItemModal />
        <UpdateMenuItemModal />
        <AdminMenuItemList />
        <DeleteMenuItem />
      </div>
    </div>
  );
}
