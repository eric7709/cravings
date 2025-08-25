"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CategoryService } from "../services/categoryServices";
import { Category } from "../types/category";

// 📌 Fetch all categories
export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => CategoryService.getAllCategories(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

// 📌 Create category
export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<Category, Error, string>({
    mutationFn: (name) => CategoryService.createCategory(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

// 📌 Update category
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<Category, Error, { id: string; name: string }>({
    mutationFn: ({ id, name }) => CategoryService.updateCategory(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

// 📌 Delete category
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id) => CategoryService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
