import { create } from "zustand";
import { MenuItem, MenuItemDataStore } from "../types/menuItems";

export const useMenuItemDataStore = create<MenuItemDataStore>((set, get) => ({
  menuItems: [],
  searchTerm: "",
  sortBy: "name",
  sortOrder: "asc",
  isLoading: true,
  error: null,
  selectedCategory: null,
  selectedAvailability: null, // 🆕 Added availability filter
  setMenuItems: (items) => set({ menuItems: items, error: null }),
  addMenuItem: (item) =>
    set((state) => ({
      menuItems: [item, ...state.menuItems],
      error: null,
    })),
  updateMenuItem: (id, updates) =>
    set((state) => ({
      menuItems: state.menuItems.map((menuItem) =>
        menuItem.id === id ? { ...menuItem, ...updates } : menuItem
      ),
      error: null,
    })),

  removeMenuItem: (id) =>
    set((state) => ({
      menuItems: state.menuItems.filter((m) => m.id !== id),
      error: null,
    })),

  setSearchTerm: (term) => set({ searchTerm: term }),
  setLoading: (loading) => set({ isLoading: loading }),
  setSortBy: (field) => set({ sortBy: field }),
  setSortOrder: (order) => set({ sortOrder: order }),
  setSelectedCategory: (categoryId) => set({ selectedCategory: categoryId }),
  setSelectedAvailability: (status) => set({ selectedAvailability: status }), // 🆕 Setter

  filteredMenuItems: () => {
    const {
      menuItems,
      searchTerm,
      sortBy,
      sortOrder,
      selectedCategory,
      selectedAvailability, // 🆕
    } = get();
    let result = [...menuItems];
    // 📂 Category filter
    if (selectedCategory) {
      result = result.filter(
        (item) =>
          item.categoryId === selectedCategory ||
          item.category?.id === selectedCategory
      );
    }

    // ✅ Availability filter
    if (selectedAvailability) {
      if (selectedAvailability === "available") {
        result = result.filter((item) => item.isAvailable === true);
      } else if (selectedAvailability === "unavailable") {
        result = result.filter((item) => item.isAvailable === false);
      }
    }

    // 🔍 Search filter
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.name?.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query)
      );
    }
    // ↕ Sort
    result.sort((a, b) => {
      const aValue = a[sortBy as keyof MenuItem];
      const bValue = b[sortBy as keyof MenuItem];
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });
    return result;
  },
}));
