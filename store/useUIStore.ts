import { create } from "zustand";

type UIStore = {
  isPageLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  drawerOpened: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
};

export const useUIStore = create<UIStore>((set) => ({
  isPageLoading: true,
  startLoading: () =>
    set({
      isPageLoading: true,
    }),
  stopLoading: () =>
    set({
      isPageLoading: false,
    }),
  drawerOpened: false, // Initialize as false (drawer closed by default)
  openDrawer: () =>
    set({
      drawerOpened: true,
    }),
  closeDrawer: () =>
    set({
      drawerOpened: false,
    }),
  toggleDrawer: () =>
    set((state) => ({
      drawerOpened: !state.drawerOpened, 
    })),
}));