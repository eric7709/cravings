import { create } from "zustand";
import { UseTableSelectionStore } from "../types/table";

export const useTableSelectionStore = create<UseTableSelectionStore>((set) => ({
  activeModal: null,
  setModal: (key) => set({ activeModal: key }),
  closeModal: () => set({ activeModal: null }),
  activeTable: null,
  setActiveTable: (key) => set({ activeTable: key }),
  clearActiveTable: () => set({ activeTable: null }),
}));
