import { create } from "zustand";
import { MenuItemSelectionStore } from "../types/menuItems";

export const useMenuItemSelectionStore = create<MenuItemSelectionStore>(
  (set) => ({
    activeModal: null,
    closeModal: () => set({ activeModal: null }),
    setModal: (activeModal) => set({ activeModal }),
    selectedMenuItem: null,
    selectMenuItem: (menuItem) => set({ selectedMenuItem: menuItem }),
    clearMenuItem: () => set({ selectedMenuItem: null }),
  })
);
