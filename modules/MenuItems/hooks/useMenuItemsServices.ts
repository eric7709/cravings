"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  CreateMenuItem,
  UpdateMenuItem,
  MenuItem,
} from "../types/menuItems";
import { MenuItemService } from "../services/menuItemServices";
import {
  transformMenuItem,
} from "../utils/transformMenuItems";
import { toast } from "react-toastify";

export function useGetAllMenuItems() {
  return useQuery({
    queryKey: ["menuItems"],
    queryFn: async () => {
      const data = await MenuItemService.getAllMenuItems();
      return data
    },
  });
}
export function useUnavailableItemsByIds(ids: string[]) {
  return useQuery<string[], Error>({
    queryKey: ["menu_items", "unavailable", { ids }],
    queryFn: () => MenuItemService.fetchUnavailableItemsIds(ids),
    enabled: ids.length > 0,
  });
}

export function useCreateMenuItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (menuItem: CreateMenuItem) => {
      const data = await MenuItemService.createMenuItem(menuItem);
      return transformMenuItem(data);
    },
    onSuccess: (newItem) => {
      queryClient.setQueryData<MenuItem[]>(["menuItems"], (old) =>
        old ? [newItem, ...old] : [newItem]
      );
    },
  });
}

export function useToggleMenuItemAvailability() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      isAvailable,
    }: {
      id: string;
      isAvailable: boolean;
    }) => {
      return MenuItemService.updateMenuItemAvailability(id, isAvailable);
    },
    onSuccess: (updatedItem) => {
      queryClient.setQueryData<MenuItem[]>(
        ["menu-items"],
        (oldItems) =>
          oldItems?.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
          ) ?? []
      );
      toast.success(
        `Menu item "${updatedItem.name}" is now ${
          updatedItem.isAvailable ? "available" : "unavailable"
        }`
      );
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update availability");
    },
  });
}

export function useUpdateMenuItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: UpdateMenuItem;
    }) => {
      const data = await MenuItemService.updateMenuItem(id, updates);
      return data;
    },
    onSuccess: (updatedItem) => {
      queryClient.setQueryData<MenuItem[]>(["menuItems"], (old) =>
        old
          ? old.map((item) => (item.id === updatedItem.id ? updatedItem : item))
          : [updatedItem]
      );
    },
  });
}

export function useDeleteMenuItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await MenuItemService.deleteMenuItem(id);
      return id;
    },
    onSuccess: (id) => {
      queryClient.setQueryData<MenuItem[]>(["menuItems"], (old) =>
        old ? old.filter((item) => item.id !== id) : []
      );
    },
  });
}
