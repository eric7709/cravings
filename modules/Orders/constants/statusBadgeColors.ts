import { OrderStatus } from "../types/orders";

export const STATUS_BADGE_COLORS: Record<OrderStatus, string> = {
  all: "bg-gray-100 text-gray-700 border border-gray-200",
  pending: "bg-amber-50 text-amber-700 border border-amber-200",
  completed: "bg-blue-50 text-blue-700 border border-blue-200",
  paid: "bg-green-50 text-green-700 border border-green-200",
  cancelled: "bg-red-50 text-red-700 border border-red-200",
};
