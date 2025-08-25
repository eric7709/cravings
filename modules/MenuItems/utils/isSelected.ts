import { OrderMenutItem } from "@/modules/Orders/types/orders";
export const isSelected = (items: OrderMenutItem[], id: string) => {
  return items.some((el) => el.id == id);
};
