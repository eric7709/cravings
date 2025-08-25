import { create } from "zustand";
import { EmployeeSelectionStore } from "../types/employee";

export const useEmployeeSelectionStore = create<EmployeeSelectionStore>(
  (set) => ({
    selectedEmployee: null,
    selectEmployee: (employee) =>
      set({
        selectedEmployee: employee,
      }),
    clearEmployee: () =>
      set({
        selectedEmployee: null,
      }),
    activeModal: null,
    setModal: (modal) =>
      set({
        activeModal: modal,
      }),
    closeModal: () =>
      set({
        activeModal: null,
      }),
  })
);
