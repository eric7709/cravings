import { OrderMenutItem } from "@/modules/Orders/types/orders";

export const getSelectedItem = (items: OrderMenutItem[], id: string) => {
    return items.find((el) => el.id == id);
}
