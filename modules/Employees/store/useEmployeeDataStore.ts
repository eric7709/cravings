import { create } from "zustand";
import { EmployeeDataStore } from "../types/employee";

export const useEmployeeDataStore = create<EmployeeDataStore>((set, get) => ({
  employees: [],
  filteredEmployees: [],
  isLoading: false,
  isUpdating: false,
  error: null,
  setEmployees: (employees) =>
    set({ employees, filteredEmployees: employees, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setUpdating: (isUpdating) => set({ isUpdating }),
  setError: (error) => set({ error, isLoading: false, isUpdating: false }),
  clearError: () => set({ error: null }),
  addStoreEmployee: (employee) =>
    set((state) => {
      const updated = [...state.employees, employee];
      return {
        employees: updated,
        filteredEmployees: updated,
        error: null,
      };
    }),
  updateStoreEmployee: (id, updates) =>
    set((state) => {
      const updated = state.employees.map((employee) =>
        employee.id === id ? { ...employee, ...updates } : employee
      );
      return {
        employees: updated,
        filteredEmployees: updated,
        error: null,
      };
    }),
  removeStoreEmployee: (id) =>
    set((state) => {
      const updated = state.employees.filter((employee) => employee.id !== id);
      return {
        employees: updated,
        filteredEmployees: updated,
        error: null,
      };
    }),

  filterEmployees: (searchTerm) => {
    const { employees } = get();
    if (!searchTerm.trim()) {
      set({ filteredEmployees: employees });
      return;
    }
    const term = searchTerm.toLowerCase();
    const filtered = employees.filter(
      (emp) =>
        emp.firstName?.toLowerCase().includes(term) ||
        emp.lastName?.toLowerCase().includes(term) ||
        emp.email?.toLowerCase().includes(term) ||
        emp.role?.toLowerCase().includes(term)
    );
    set({ filteredEmployees: filtered });
  },

  reset: () =>
    set({
      employees: [],
      filteredEmployees: [],
      isLoading: false,
      isUpdating: false,
      error: null,
    }),
}));
