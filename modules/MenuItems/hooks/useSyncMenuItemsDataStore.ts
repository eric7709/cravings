"use client"
import { useEffect } from "react";
import { useMenuItemDataStore } from "../store/useMenuItemsDataStore";
import { useGetAllMenuItems } from "./useMenuItemsServices";

export const useSyncMenuItemsDataStore = () => {
  const { setMenuItems, setLoading } = useMenuItemDataStore();
  const { data, isLoading } = useGetAllMenuItems();
  useEffect(() => {
    setLoading(isLoading);
    if (data) setMenuItems(data);
  }, [isLoading, data]);
};
