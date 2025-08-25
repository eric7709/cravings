"use client"
import { useEffect } from "react";
import { useOrderDataStore } from "../store/useOrderDataStore";

export const useSyncOrderDataStore = () => {
  const fetchOrders = useOrderDataStore((s) => s.fetchOrders);
  useEffect(() => {
    fetchOrders();
  }, []);
};
