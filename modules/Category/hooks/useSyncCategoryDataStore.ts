"use client"
import { useEffect } from "react";
import { useCategoryDataStore } from "../store/useCategoriesDataStore";
import { useGetAllCategories } from "./useCategoryServices";

export const useSyncCategoryDataStore = () => {
  const { data, isLoading } = useGetAllCategories();
  const setCategories = useCategoryDataStore((s) => s.setCategories);
  const setLoading = useCategoryDataStore((s) => s.setLoading);
  useEffect(() => {
  setLoading(isLoading);
  if (data) setCategories(data);
}, [data, isLoading]);
};
