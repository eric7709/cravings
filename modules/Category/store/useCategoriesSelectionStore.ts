import { create } from "zustand";
import { CategorySelectionStore } from "../types/category";

export const useCategorySelectionStore = create<CategorySelectionStore>(
  (set) => ({
    activeModal: null,
    selectedCategory: null,
    selectCategory: (category) =>
      set({
        selectedCategory: category,
      }),
    clearCategory: () =>
      set({
        selectedCategory: null,
      }),
    setModal: (modal: "update" | "create" | "delete" | null) =>
      set({
        activeModal: modal,
      }),
    closeModal: () =>
      set({
        activeModal: null,
      }),
  })
);
