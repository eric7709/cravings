import { create } from "zustand";
import { Table, UseTableDataStore } from "../types/table";
import { TableService } from "../services/tableServices";

export const useTableDataStore = create<UseTableDataStore>((set, get) => ({
  tables: [],
  isLoading: true,
  isUpdating: false,
  error: null,
  searchTerm: "",
  allocationFilter: "all", 
  sortBy: "tableNumber" as keyof Table,
  sortOrder: "asc",
  setTables: (tables) => {
    set({ tables: [...tables], error: null });
  },
  setLoading: (isLoading) => set({ isLoading }),
  setUpdating: (isUpdating) => set({ isUpdating }),
  setError: (error) => set({ error, isLoading: false, isUpdating: false }),
  clearError: () => set({ error: null }),
  setAllocationFilter: (filter) => set({ allocationFilter: filter }),
  // Fetch tables without automatic sorting
  fetchTables: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await TableService.getAllTables();
      get().setTables(data);
      set({ isLoading: false });
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch tables",
        isLoading: false,
      });
    }
  },
  updateTable: (id, updates) =>
    set((state) => {
      const updatedTables = state.tables.map((table) =>
        table.id === id ? { ...table, ...updates } : table
      );
      return {
        tables: updatedTables,
        error: null,
      };
    }),

  // Remove automatic sorting from addTable
  addTable: (table) =>
    set((state) => {
      const exists = state.tables.some((t) => t.id === table.id);
      if (exists) return {};
      return {
        tables: [table, ...state.tables],
        error: null,
      };
    }),

  removeTable: (id) =>
    set((state) => ({
      tables: state.tables.filter((table) => table.id !== id),
      error: null,
    })),

  reset: () =>
    set({
      tables: [],
      isLoading: false,
      isUpdating: false,
      error: null,
      searchTerm: "",
      allocationFilter: "all",
      sortBy: "tableNumber" as keyof Table, // Default to tableNumber
      sortOrder: "asc",
    }),

  setSearchTerm: (term) => set({ searchTerm: term }),
  setSortBy: (field: keyof Table) => set({ sortBy: field }),
  setSortOrder: (order) => set({ sortOrder: order }),

  filteredTables: () => {
    const { tables, searchTerm, allocationFilter, sortBy, sortOrder } = get();
    let result = [...tables];

    // Apply search filter
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      result = result.filter((table) => {
        const tableName = String(table.name ?? "").toLowerCase();
        const waiterName = table.waiter
          ? `${table.waiter.firstName} ${table.waiter.lastName}`.toLowerCase()
          : "";
        return tableName.includes(query) || waiterName.includes(query);
      });
    }

    // Apply allocation filter
    if (allocationFilter === "allocated") {
      result = result.filter((table) => !!table.waiter);
    } else if (allocationFilter === "unallocated") {
      result = result.filter((table) => !table.waiter);
    }

    // Apply sorting based on current sortBy and sortOrder
    result.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;
      
      // Handle numeric values (like tableNumber)
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
      
      // Handle string values
      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();
      return sortOrder === "asc"
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });

    return result;
  },
}));