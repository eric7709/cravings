"use client";
import { Order, OrderStatus } from "@/modules/Orders/types/orders";
import { FaPrint, FaClock, FaUser } from "react-icons/fa";
import { getStyle } from "../../Kitchen/utils/getStyle";
import { useRef } from "react";
import { useTableDataStore } from "@/modules/Tables/store/useTableDataStore";
import { useReactToPrint } from "react-to-print";
import { Clock } from "lucide-react";
import { TableService } from "@/modules/Tables/services/tableServices";
import { convertTo12HourFormat } from "@/utils/convertTo12HourFormat";

type Props = {
  order: Order;
};

export default function CashierOrderCardHeader(order: Order) {
  const { customerName, customerTitle, waiterName } = order;
  const { tables } = useTableDataStore();
  const table = TableService.getTable(tables, order.tableId as string);
  const invoiceRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: "Invoice",
  });

  const headerBg = {
    pending: "bg-amber-100",
    completed: "bg-cyan-100",
    paid: "bg-green-100",
    cancelled: "bg-red-100",
  }
  
  
  return (
    <>
      <header className={`flex items-center justify-between p-4 pb-2 border-b ${headerBg[order.status as keyof typeof headerBg]} border-gray-100 bg-emerald-50`}>
        <div className="flex items-center gap-3">
          <div
            className={`flex-shrink-0 px-3 py-2 rounded-lg font-semibold text-lg text-white ${getStyle(order.status).bg} shadow-sm`}
            aria-label={`Table number ${table?.tableNumber ?? "?"}`}
          >
            #{table?.tableNumber ?? "?"}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {customerTitle} {customerName}
            </p>
          </div>
        </div>
        {order.status !== "cancelled" && (
          <button
            onClick={handlePrint}
            title="Print Invoice"
            aria-label="Print Invoice"
            className="text-gray-500 cursor-pointer hover:text-gray-700 transition"
          >
            <FaPrint size={18} />
          </button>
        )}
      </header>
      {waiterName && (
        <div className="flex justify-between   p-2 px-4 bg-gray-50 border-b border-gray-100  items-center">
          <div className="flex items-center text-xs font-medium text-gray-600">
            <img src="/waiter.png" className="h-5 mr-1" alt="" />
            <p className="ml-1 font-semibold text-black">{waiterName}</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5 select-text">
            <Clock size={15} />
            <time dateTime={order.createdAt}>
              {convertTo12HourFormat(order.createdAt)}
            </time>
          </div>
        </div>
      )}
    </>
  );
}
