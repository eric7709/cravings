import { create } from "zustand";
import { CategoryDataStore } from "../types/category";

export const useCategoryDataStore = create<CategoryDataStore>(
  (set, get) => ({
    categories: [],
    isLoading: false,
    isUpdating: false,
    error: null,
    searchTerm: "",
    sortBy: "name",
    sortOrder: "asc",

    setCategories: (categories) => set({ categories, error: null }),
    setLoading: (isLoading) => set({ isLoading }),
    setUpdating: (isUpdating) => set({ isUpdating }),
    setError: (error) => set({ error, isLoading: false, isUpdating: false }),
    clearError: () => set({ error: null }),

    addCategory: (category) =>
      set((state) => ({
        categories: [category, ...state.categories],
        error: null,
      })),

    updateCategory: (id, updates) =>
      set((state) => {
        state.filteredCategories()
        const updatedCategories = state.categories.map((category) => {
          if (category.id === id) {
            const updated = { ...category, ...updates };
            return updated;
          }
          return category;
        });
        return { categories: updatedCategories, error: null };
      }),
    removeCategory: (id) =>
      set((state) => ({
        categories: state.categories.filter((category) => category.id !== id),
        error: null,
      })),

    reset: () =>
      set({
        categories: [],
        isLoading: false,
        isUpdating: false,
        error: null,
        searchTerm: "",
        sortBy: "name",
        sortOrder: "asc",
      }),

    setSearchTerm: (term) => {
      set({ searchTerm: term });
    },

    setSortBy: (field) => {
      set({ sortBy: field });
    },

    setSortOrder: (order) => {
      set({ sortOrder: order });
    },

    filteredCategories: () => {
      const { categories, searchTerm, sortBy, sortOrder } = get();
      let result = [...categories];
      // Filter by search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        result = result.filter((category) =>
          category.name?.toLowerCase().includes(query)
        );
      }

      // Sort
      result.sort((a, b): any => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (aValue === null || bValue === null) return 0;
        return sortOrder === "asc"
          ? aValue?.localeCompare(String(bValue))
          : bValue?.localeCompare(String(aValue));
      });

      return result;
    },
  })
);
