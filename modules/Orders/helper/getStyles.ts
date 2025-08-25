import { OrderStatus } from "@/modules/Orders/types/orders";

export const getStyle = (status: OrderStatus) => {
  const styles = {
    pending: { bg: "bg-yellow-500" },
    completed: { bg: "bg-blue-500" },
    paid: { bg: "bg-green-600" },
    cancelled: { bg: "bg-red-500" },
    all: { bg: "bg-gray-300" },
  } as const;

  return styles[status] || { bg: "bg-gray-300" };
};