import { OrderStatus } from "@/modules/Orders/types/orders";

export const STATUSES: [string, OrderStatus][] = [
    ["all", "all"],
    ["pending", "pending"],
    ["completed", "completed"],
    ["paid", "paid"],
    ["cancelled", "cancelled"],
  ];