"use client"
import { useEffect } from "react";
import { useSyncOrderDataStore } from "./useSyncOrderDataStore"; // your existing fetch hook
import { subscribeToOrders } from "../helper/subscribeToOrders";

export const useOrderDataSyncAndSubscribe = () => {
  useSyncOrderDataStore();
  useEffect(() => {
    const unsubscribe = subscribeToOrders();
    return () => {
      unsubscribe();
    };
  }, []);
};
