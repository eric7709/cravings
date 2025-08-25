import { MenuItem } from "../types/menuItems";

export const transformMenuItem = (item: any): MenuItem => {
  return {
    id: item.id ?? "", 
    name: item.name ?? "",
    price: Number(item.price ?? 0),
    description: item.description ?? "",
    imageUrl: item.image_url ?? null,
    isAvailable: item.is_available ?? false,
    createdAt: item.created_at ?? null,
    categoryId: item.category_id ?? null,
    category: Array.isArray(item.categories)
      ? item.categories[0] || null
      : item.categories || null,
    ingredients: item.ingredients ?? [],
  };

};


export const transformMenuItems = (items: any[]): MenuItem[] => {
  const data = items.map(transformMenuItem);
  return data
};
