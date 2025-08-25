// src/modules/Tables/hooks/useTableQueries.ts
"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TableFormData } from "../types/table";
import { TableService } from "../services/tableServices";

// 🔹 Get all tables
export const useGetAllTables = () =>
  useQuery({
    queryKey: ["tables"],
    queryFn: TableService.getAllTables,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

// 🔹 Create table
export const useCreateTable = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (form: TableFormData) => TableService.createTable(form),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tables"] }),
  });
};

// 🔹 Update table
export const useUpdateTable = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<TableFormData> }) =>
      TableService.updateTable(id, updates),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tables"] }),
  });
};

// 🔹 Delete table
export const useDeleteTable = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => TableService.deleteTable(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tables"] }),
  });
};

// 🔹 Allocate waiter
export const useAllocateWaiter = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ tableId, waiterId }: { tableId: string; waiterId: string }) =>
      TableService.allocateWaiter(tableId, waiterId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tables"] }),
  });
};

// 🔹 Deallocate waiter
export const useDeallocateWaiter = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (tableId: string) => TableService.deallocateWaiter(tableId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tables"] }),
  });
};
