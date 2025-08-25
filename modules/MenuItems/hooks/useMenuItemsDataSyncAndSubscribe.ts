"use client"

import { useEffect } from "react";
import { subscribeToMenuItems } from "../helper/subscribeToMenuItems";
import { useSyncMenuItemsDataStore } from "./useSyncMenuItemsDataStore";

export const useMenuItemsDataSyncAndSubscribe = () => {
  useSyncMenuItemsDataStore();
  useEffect(() => {
    const unsubscribe = subscribeToMenuItems();
    return () => {
      unsubscribe();
    };
  }, []);
};
