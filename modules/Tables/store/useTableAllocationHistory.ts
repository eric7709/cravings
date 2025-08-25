import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { TableAllocationHistory, UseTableAllocationDataStore } from "../types/table";


export const useTableAllocationDataStore = create<UseTableAllocationDataStore>(
  (set) => ({
    history: [],
    isLoading: false,
    error: null,
    fetchHistory: async (options = {}) => {
      const { waiterId, startDate, endDate } = options;
      set({ isLoading: true, error: null });
      let query = supabase
        .from("table_allocation_history")
        .select(`
          id,
          table_id,
          allocated_at,
          deallocated_at,
          waiter_id,
          tables (name, capacity),
          employees (firstname, lastname)
        `)
        .order("allocated_at", { ascending: false });

      if (waiterId) query = query.eq("waiter_id", waiterId);
      if (startDate) query = query.gte("allocated_at", startDate);
      if (endDate) query = query.lte("allocated_at", endDate);
      const { data, error } = await query;
      if (error) {
        set({ error: error.message, isLoading: false });
        return;
      }
      const history: TableAllocationHistory[] = data.map((row: any) => ({
        id: row.id,
        tableId: row.table_id,
        tableName: row.tables?.name ?? "Unknown Table",
        capacity: row.tables?.capacity ?? null,
        waiterId: row.waiter_id,
        waiterName: row.employees
          ? `${row.employees.firstname} ${row.employees.lastname}`
          : "Unassigned",
        allocatedAt: row.allocated_at,
        deallocatedAt: row.deallocated_at,
      }));

      set({ history, isLoading: false });
    },
    clear: () => set({ history: [], error: null, isLoading: false }),
  })
);
