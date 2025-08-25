"use client";
import { X as MultiplyIcon } from "lucide-react";
import { Order, OrderStatus } from "../types/orders";
import { getCancelButtonStyles } from "../constants/cancelButtonStyle";
import { CARD_STYLES } from "../constants/cardStyles";
import { STATUS_BADGE_COLORS } from "../constants/statusBadgeColors";


type Props = {
  order: Order;
  isPending: boolean;
  handleCancelClick: () => void;
};
export default function AdminOrderCardHeader(props: Props) {
  const { isPending, order, handleCancelClick } = props;
  const renderCancelButton =
    order.status !== "cancelled" && order.status !== "paid";
  return (
    <div>
      <div className="flex bg-white rounded-md p-2 shadow-md justify-between items-start mb-2">
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-slate-900 tracking-tight truncate">
              {order.customerTitle} {order.customerName}
            </h2>
            <button
              onClick={handleCancelClick}
              disabled={isPending}
              className={`${getCancelButtonStyles(isPending)} ${!renderCancelButton && "hidden"}`}
              title={isPending ? "Cancelling..." : "Cancel Order"}
              aria-label={`Cancel order ${order.invoiceId}`}
            >
              <MultiplyIcon size={12} strokeWidth={2.5} />
            </button>
          </div>
          <p className="text-xs text-blue-600 font-medium tracking-wide">
            #{order.invoiceId}
          </p>
        </div>
        <div
          className={`${CARD_STYLES.statusBadge} ${STATUS_BADGE_COLORS[order.status as OrderStatus]}`}
          aria-live="polite"
        >
          {order.status}
        </div>
      </div>
    </div>
  );
}
