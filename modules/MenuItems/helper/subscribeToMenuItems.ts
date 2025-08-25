import { createRealtimeSubscription } from "@/utils/createRealTimeSubscription";
import { useMenuItemDataStore } from "../store/useMenuItemsDataStore";
import { normalizeMenuItem } from "../utils/normalizeMenuItems";
export const subscribeToMenuItems = () => {
  const { addMenuItem, updateMenuItem, removeMenuItem } = useMenuItemDataStore.getState();
  return createRealtimeSubscription("menu_items", {
    onInsert: (row) => addMenuItem(normalizeMenuItem(row)),
    onUpdate: (row) => updateMenuItem(row.id, normalizeMenuItem(row)),
    onDelete: (id) => removeMenuItem(id),
  });
};