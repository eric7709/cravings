"use client";
import React, { forwardRef, useEffect, useState } from "react";
import { Table } from "@/modules/Tables/types/table";
import { useTableDataStore } from "@/modules/Tables/store/useTableDataStore";
import { Order } from "../types/orders";
import { formatPrice } from "@/utils/formatPrice";

type Props = {
  order: Order;
  waiterName: string | null;
  currentDateTime: string;
};
const Invoice = forwardRef<HTMLDivElement, Props>(({ order, waiterName, currentDateTime }, ref) => {
  
  
  const [table, setTable] = useState<Table | null>(null);
  const { tables } = useTableDataStore();
  useEffect(() => {
    if (order.tableId) {
      const table = tables.find((el) => el.id == order.tableId);
      if (table) {
        setTable(table);
      }
    }
  }, [order.tableId]);

  return (
    <div ref={ref} className="w-full">
      <div
        style={{
          width: "80mm",
          padding: "20px",
          marginTop: "50px",
          fontFamily: "monospace",
        }}
        className="mx-auto text-gray-800 text-sm bg-white"
      >
        {/* Header */}
        <div className="text-center border-b border-dashed border-gray-400 pb-2 mb-2">
          <h1 className="text-base font-bold">🍽️ Your Restaurant</h1>
          <p className="text-xs">123 Main Street, City</p>
          <p className="text-[10px] text-gray-500">
            Receipt #{order.invoiceId}
          </p>
          <p className="text-[10px] text-gray-500">{currentDateTime}</p>
        </div>

        {/* Details */}
        <div className="mb-2 text-[13px] space-y-1">
          <p>
            <span className="font-semibold">Table:</span> #{table?.tableNumber}
          </p>
          <p>
            <span className="font-semibold">Customer:</span>{" "}
            {order.customerTitle} {order.customerName}
          </p>
          <p>
            <span className="font-semibold">Waiter:</span>{" "}
            {waiterName?.split(" ")[0] || "Unassigned"}
          </p>
        </div>

        {/* Items */}
        <div className="border-t border-b border-dashed border-gray-200 py-2 mb-2">
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between text-xs mb-1 text-gray-700"
            >
              <span>
                {item.quantity} × {item.name}
              </span>
              <span>{formatPrice(item.quantity * item.price)}</span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="text-right text-sm font-semibold">
          Total: {formatPrice(order.total)}

        </div>

        {/* Footer */}
        <p className="text-center text-[10px] mt-2">
          ⭐ Thanks for dining with us! ⭐
        </p>
      </div>
    </div>
  );
});

// Set display name for better debugging
Invoice.displayName = 'Invoice';

export default Invoice;