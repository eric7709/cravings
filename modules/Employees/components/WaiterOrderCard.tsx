import { Order } from "@/modules/Orders/types/orders";
import { TableService } from "@/modules/Tables/services/tableServices";
import { useTableDataStore } from "@/modules/Tables/store/useTableDataStore";
import { FaClock, FaTimes } from "react-icons/fa";

export default function WaiterOrderCard(order: Order) {
  const { tables } = useTableDataStore();
  const getTable = (tableId: string) => {
    return TableService.getTable(tables, tableId);
  };
  return (
    <div
      key={order.id}
      className="p-4 bg-blue-900 text-white rounded-xl shadow"
    >
      <div className="mb-2 text-sm space-y-2">
        <p className="font-semibold text-base">Order ID: {order.invoiceId}</p>
        {order.tableId && <p>Table: {getTable(order.tableId)?.name}</p>}
        {order.tableId && <p>Table: #{getTable(order.tableId)?.tableNumber}</p>}
        <p>Customer: {order.customerName || "—"}</p>
        <p className="flex items-center gap-1">
          <FaClock className="text-xs" />
          {order.createdAt
            ? new Date(order.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "—"}
        </p>
      </div>
      <div className="space-y-1.5">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-2 text-black bg-gray-100 p-2 rounded text-sm"
          >
            <span>{item.name}</span>
            <FaTimes className="text-xs" />
            <span>{item.quantity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
