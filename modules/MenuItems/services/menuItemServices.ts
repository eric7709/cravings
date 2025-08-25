import { supabase } from "@/lib/supabase";

import { PromiseString } from "@/types/shared";
import { CreateMenuItem, Image, MenuItem, UpdateMenuItem } from "../types/menuItems";
import { transformMenuItem, transformMenuItems } from "../utils/transformMenuItems";
import { uploadImageToSupabase } from "./uploadImageToSupabase";

export class MenuItemService {
  static async getAllMenuItems(): Promise<MenuItem[]> {
    const { data, error } = await supabase
      .from("menu_items")
      .select(
        `
        *,
        categories (id, name, created_at)
      `
      )
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching menu items:", error);
      return [];
    }
    return transformMenuItems(data || []);
  }
  static async fetchUnavailableItemsIds(ids: string[]): Promise<string[]> {
    if (ids.length === 0) return [];
    const { data, error } = await supabase
      .from("menu_items")
      .select("id")
      .in("id", ids)
      .eq("is_available", false);
    const newData = data?.map((el) => el.id);
    if (error) {
      throw new Error(error.message);
    }
    return newData || [];
  }
  static async uploadImage(image: Image): PromiseString {
    if (image.file) {
      const uploadedUrl = await uploadImageToSupabase(image.file);
      return uploadedUrl || "";
    }
    return "";
  }

  static validateCreationForm(value: CreateMenuItem) {
    const errors: Partial<CreateMenuItem> = {};
    if (!value.categoryId.trim()) errors.categoryId = "Category is required";
    if (!value.description.trim())
      errors.description = "Description is required";
    if (!value.name.trim()) errors.name = "Item Name is required";
    if (!value.price.trim()) errors.price = "Price is required";
    return {
      isValid: Object.values(errors).every((error) => error === ""),
      errors,
    };
  }
  static validateUpdateForm(value: UpdateMenuItem) {
    const errors: Partial<UpdateMenuItem> = {};
    if (!value.id.trim()) errors.id = "Menu Item ID is required";
    if (!value.categoryId.trim()) errors.categoryId = "Category is required";
    if (!value.description.trim())
      errors.description = "Description is required";
    if (!value.name.trim()) errors.name = "Item Name is required";
    if (!value.price.trim()) errors.price = "Price is required";
    return {
      isValid: Object.values(errors).every((error) => error === ""),
      errors,
    };
  }

  /** Create a menu item */
  static async createMenuItem(menuItem: CreateMenuItem): Promise<MenuItem> {
    const { data, error } = await supabase
      .from("menu_items")
      .insert({
        name: menuItem.name,
        price: menuItem.price,
        description: menuItem.description,
        image_url: menuItem.imageUrl,
        is_available: menuItem.isAvailable,
        category_id: menuItem.categoryId,
      })
      .select(
        `
        *,
        categories (id, name, created_at)
      `
      )
      .single();

    if (error) throw error;
    return transformMenuItem(data);
  }

  /** Update a menu item */
  static async updateMenuItem(
    id: string,
    updates: UpdateMenuItem
  ): Promise<MenuItem> {
    const { data, error } = await supabase
      .from("menu_items")
      .update({
        name: updates.name,
        price: updates.price,
        description: updates.description,
        image_url: updates.imageUrl,
        is_available: updates.isAvailable,
        category_id: updates.categoryId,
      })
      .eq("id", id)
      .select(
        `
        *,
        categories (id, name, created_at)
      `
      )
      .single();
    if (error) throw error;
    return transformMenuItem(data);
  }

  /** Update menu item availability only */
  static async updateMenuItemAvailability(
    id: string,
    isAvailable: boolean
  ): Promise<MenuItem> {
    const { data, error } = await supabase
      .from("menu_items")
      .update({ is_available: isAvailable })
      .eq("id", id)
      .select(
        `
        *,
        categories (id, name, created_at)
      `
      )
      .single();
    if (error) throw error;
    return transformMenuItem(data);
  }
  /** Delete a menu item */
  static async deleteMenuItem(id: string): Promise<void> {
    const { error } = await supabase.from("menu_items").delete().eq("id", id);
    if (error) throw error;
  }
}
