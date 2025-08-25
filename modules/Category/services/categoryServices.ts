import { supabase } from "@/lib/supabase";
import { Category } from "../types/category";

export class CategoryService {
  static async getAllCategories(): Promise<Category[]> {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name", { ascending: true });
      if (error) throw error;
      return data.map((category) => ({
        id: category.id,
        name: category.name,
      }));
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  }

  static async createCategory(name: string): Promise<Category> {
    try {
      const { data, error } = await supabase
        .from("categories")
        .insert({ name: name.trim() })
        .select("*")
        .single();

      if (error) throw error;
      return {
        id: data.id,
        name: data.name,
      };
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  }

  static async updateCategory(id: string, name: string): Promise<Category> {
    try {
      const { data, error } = await supabase
        .from("categories")
        .update({ name: name.trim() })
        .eq("id", id)
        .select("*")
        .single();

      if (error) throw error;
      return {
        id: data.id,
        name: data.name,
      };
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  }

  static async deleteCategory(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", id);

      if (error) throw error;
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  }
}
