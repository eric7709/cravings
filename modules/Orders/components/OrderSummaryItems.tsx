"use client";

import { FaTrashAlt } from "react-icons/fa";
import { OrderMenutItem } from "../types/orders";
import { formatPrice } from "@/utils/formatPrice";

type Props = {
  items: OrderMenutItem[];
  unavailableIds: string[];
  success: boolean;
  toggleTakeHome: (id: string) => void;
  handleRemoveItem: (id: string) => void;
  isSubmitting: boolean;
};

export default function OrderSummaryItems(props: Props) {
  const {
    items,
    unavailableIds,
    success,
    toggleTakeHome,
    handleRemoveItem,
    isSubmitting,
  } = props;

  return (
    <div>
      <section className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-gray-50">
        {items.map((item) => {
          const isUnavailable = unavailableIds.includes(item.id);
          return (
            <div
              key={item.id}
              className={`flex items-center justify-between p-4 rounded-lg shadow-sm ${
                isUnavailable
                  ? "bg-red-100 text-red-800 border border-red-300"
                  : "bg-white text-gray-900 border border-gray-200"
              }`}
            >
              {/* Item Info and Take Home */}
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-semibold text-sm capitalize">{item.name}</p>
                  {isUnavailable ? (
                    <p className="mt-1 text-xs font-semibold text-red-700">
                      ❌ Unavailable
                    </p>
                  ) : !success && (
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        onClick={() => toggleTakeHome(item.id)}
                        className={`px-2 py-1 cursor-pointer text-xs rounded-full border transition-colors duration-200 ${
                          item.takeHome
                            ? "bg-blue-500 text-white border-blue-600"
                            : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                        }`}
                      >
                        Take Home
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <p className="font-semibold text-sm text-gray-800">
                  {item.quantity
                    ? `${item.quantity} x ${formatPrice(item.price)}`
                    : formatPrice(item.price)}
                </p>
                {!success && (
                  <button
                    onClick={(e) => {
                      if (isSubmitting) {
                        e.stopPropagation();
                        return;
                      }
                      handleRemoveItem(item.id);
                    }}
                    className="p-1.5 rounded-full hover:bg-red-200 text-red-700 transition-colors"
                    aria-label="Remove item"
                    title="Remove item"
                  >
                    <FaTrashAlt size={14} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}