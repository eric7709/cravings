import { MenuItem } from "../types/menuItems";

export const filterMenuItems = (menuItems: MenuItem[], searchTerm: string, category: string): MenuItem[] => {
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const normalizedCategory = category.toLowerCase();
  const newMenuItems = menuItems.filter((el) => {
    const nameMatches = el.name.toLowerCase().includes(normalizedSearch);
    const categoryMatches =
      normalizedCategory === "all" ||
      el.category?.name.toLowerCase() === normalizedCategory;
    return nameMatches && categoryMatches;
  });
  return newMenuItems
};
