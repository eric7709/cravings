import { formatPrice } from "@/utils/formatPrice";
import { Order } from "../types/orders";
import { House } from "lucide-react";

export default function CashierOrderCardItems(order: Order) {
  const sortedItems = [...order.items].sort((a, b) => {
    if (a.takeHome === b.takeHome) return 0;
    return a.takeHome ? -1 : 1;
  });
  return (
    <section className="px-4 pt-2 h-fit">
      {sortedItems.map((item, key) => (
        <div
          key={item.id}
          className={`flex justify-between relative pb-2 items-center mb-2 last:mb-0 ${
            sortedItems.length - 1 !== key && "border-b border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center justify-center rounded  text-white font-semibold w-6 h-6 text-xs select-none ${order.status == "cancelled" ? "bg-red-300" : "bg-blue-600"}`}
            >
              {item.quantity}
            </div>

            <div>
              <p
                className={`${order.status == "cancelled" ? "text-gray-500" : "text-black"} text-gray-600 font-medium text-[13px] capitalize`}
              >
                {item.name}
              </p>
            </div>
          </div>
          {item.takeHome && <House size={15} color="blue" />}
          <p
            className={`${order.status == "cancelled" ? "text-gray-500" : "text-black"} font-semibold text-[13px]`}
          >
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
      ))}
    </section>
  );
}
