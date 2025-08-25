import { Order, OrderResult } from "../types/orders";


export function transformOrder(order: OrderResult): Order {
  return {
        id: order.id,
        tableId: order.table_id ?? null,
        tableName: order.table_name ?? null,
        waiterId: order.waiter_id ?? null,
        waiterName: order.waiter_name ?? null,
        items: Array.isArray(order.items) ? order.items : [],
        total: typeof order.total === "number" ? order.total : 0,
        status: order.status || "pending",
        createdAt: order.created_at ?? new Date().toISOString(), 
        updatedAt: order.updated_at ?? new Date().toISOString(),
        customerName: order.customer_name ?? null,
        customerId: order.customer_id ?? null,
        discount: order.discount ?? null,
        customerTitle: order.customer_title ?? null,
        invoiceId: order.invoice_id ?? null,
      };
}
export function transformOrders(orders: OrderResult[]): Order[] {
  return orders.map(transformOrder);
}
