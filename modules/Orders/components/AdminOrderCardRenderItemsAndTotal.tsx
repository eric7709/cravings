import { formatPrice } from "@/utils/formatPrice";
import { CARD_STYLES } from "../constants/cardStyles";
import { Order } from "../types/orders";
import { House } from "lucide-react";

export default function AdminOrderCardRenderItemsAndTotal(order: Order) {
  const sortedItems = [...order.items].sort((a, b) => {
    if (a.takeHome && !b.takeHome) return -1;
    if (!a.takeHome && b.takeHome) return 1;
    return 0;
  });

  return (
      <div className="mt-auto border-slate-200 pt-1 flex-1 flex flex-col">
        <h3 className="text-xs font-semibold text-slate-800 mb-2 uppercase tracking-wider">
          Order Items
        </h3>
        <div className="flex-1">
          <div className="space-y-1.5">
            {sortedItems.map((item, index) => (
              <div
                key={index}
                className={`${CARD_STYLES.itemCard} relative`}
                role="listitem"
                aria-label={`${item.quantity} x ${item.name}`}
              >
                <div className="flex items-center gap-2 text-xs">
                  <div className={CARD_STYLES.quantityBadge}>
                    {item.quantity}
                  </div>
                  <span className="font-medium text-slate-800 capitalize truncate">
                    {item.name}
                  </span>
                </div>
                {item.takeHome && <House size={15} color="blue" />}
                <span className="text-xs font-semibold text-slate-900 ml-2">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-2.5 border-t border-slate-200 bg-emerald-50 rounded p-2 mt-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-800 uppercase tracking-wide">
              Total
            </span>
            <span className="text-sm font-bold text-emerald-700">
              {formatPrice(order.total)}
            </span>
          </div>
        </div>
      </div>
  );
}
