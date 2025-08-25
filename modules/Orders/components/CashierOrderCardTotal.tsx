import { formatPrice } from "@/utils/formatPrice";
import { Order } from "../types/orders";

export default function CashierOrderCardTotal(order: Order) {
  return (
    <section className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200 font-semibold text-gray-900 text-sm select-text">
      <p className={`${order.status == "cancelled" ? "text-gray-500" : ""}`}>
        {order.items.length} {order.items.length > 1 ? "Items" : "Item"}
      </p>
      {order.status === "paid" && (
        <p className="text-xs capitalize text-green-500">
          {order.paymentMethod}
        </p>
      )}
      <p className={`${order.status == "cancelled" ? "text-gray-500" : ""}`}>{formatPrice(order.total)}</p>
    </section>
  );
}
