"use client";
import { useEffect } from "react";
import { useTableDataStore } from "@/modules/Tables/store/useTableDataStore";
export const useSyncTableDataStore = () => {
  const { fetchTables } = useTableDataStore();
  useEffect(() => {
    fetchTables();
  }, [fetchTables]);
};
