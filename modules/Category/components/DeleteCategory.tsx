"use client";
import { useState } from "react";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import { toast } from "react-toastify";
import { useDeleteCategory } from "../hooks/useCategoryServices";
import { useCategoryDataStore } from "../store/useCategoriesDataStore";
import { useCategorySelectionStore } from "../store/useCategoriesSelectionStore";

export default function DeleteCategory() {
  const { activeModal, selectedCategory, closeModal, clearCategory } =
    useCategorySelectionStore();
  const { removeCategory } = useCategoryDataStore();
  const { mutate, isPending } = useDeleteCategory();

  const handleDelete = () => {
    if (!selectedCategory) return;
    mutate(selectedCategory.id, {
      onSuccess: () => {
        removeCategory(selectedCategory.id);
        clearCategory();
        toast.success("Category deleted successfully");
        closeModal();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <ConfirmDeleteModal
      isOpen={activeModal === "delete"}
      type="Category"
      name={selectedCategory?.name}
      onClose={() => {
        closeModal();
        clearCategory();
      }}
      onConfirm={handleDelete}
      isLoading={isPending}
    />
  );
}
