import { MenuItem } from "../types/menuItems";

export function normalizeMenuItem(payload: any): MenuItem {
  return {
    id: payload.id,
    name: payload.name,
    description: payload.description,
    price: payload.price,
    categoryId: payload.category_id,
    category: payload.category,
    createdAt: payload.created_at,
    imageUrl: payload.image_url,
    ingredients: payload.ingredients || [],
    isAvailable: payload.is_available,
  };
}