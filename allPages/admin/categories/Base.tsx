"use client";
import CreateUpdateCategoryModal from "@/modules/Category/components/CreateUpdateCategoryModal";
import { useSyncCategoryDataStore } from "@/modules/Category/hooks/useSyncCategoryDataStore";
import DeleteCategoryModal from "@/modules/Category/components/DeleteCategory";
import CategoriesHeader from "@/modules/Category/components/CategoriesHeader";
import CategoryList from "@/modules/Category/components/CategoryList";
export default function Base() {
  useSyncCategoryDataStore();
  return (
    <div className="h-screen flex flex-col">
      <CategoriesHeader />
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <CategoryList />
        <DeleteCategoryModal />
        <CreateUpdateCategoryModal />
      </div>
    </div>
  );
}
