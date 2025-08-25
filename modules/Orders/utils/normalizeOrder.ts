import { Order } from "../types/orders";

export function normalizeOrder(payload: any): Order {
  return {
    id: payload.id,
    tableId: payload.table_id,
    waiterId: payload.waiter_id,
    customerId: payload.customer_id,
    customerName: payload.customer_name,
    customerTitle: payload.customer_title,
    items: payload.items || [],
    status: payload.status,
    invoiceId: payload.invoice_id,
    tableName: payload.table_name,
    total: payload.total,
    waiterName: payload.waiter_name,
    createdAt: payload.created_at,
  };
}