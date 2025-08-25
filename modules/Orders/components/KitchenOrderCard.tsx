"use client";
import { useTableDataStore } from "@/modules/Tables/store/useTableDataStore";
import { Order } from "@/modules/Orders/types/orders";
import { Table } from "@/modules/Tables/types/table";
import { useEffect, useState } from "react";
import { getStyle } from "../helper/getStyles";


export default function KitchenOrderCard(order : Order) {
  const { waiterName } = order;
  const { tables } = useTableDataStore();
  const [table, setTable] = useState<Table | null>(null);
  useEffect(() => {
    const foundTable = tables.find((el) => el.id === order.tableId);
    if (foundTable) setTable(foundTable);
  }, [tables]);

  return (
    <div className="text-sm border border-gray-200 rounded-xl shadow flex flex-col bg-white">
      <div className="flex justify-between items-center p-4 border-b border-gray-100 pb-3 mb-3">
        <div className="flex items-center gap-2 text-gray-700">
          <img src="/waiter.png" className="h-6" alt="" />
          <span className="text-gray-600 font-semibold">Waiter:</span>
          <span className="font-semibold text-gray-900">{waiterName}</span>
        </div>
        {table && (
          <div
            className={`p-2.5 ${getStyle(order.status).bg} rounded-md font-semibold text-white`}
          >
            #{table.tableNumber}
          </div>
        )}
      </div>
      <div className="space-y-3 flex-1 overflow-auto h-fit">
        {order.items.map((item) => (
          <div
            className=" border-b border-gray-100 pb-3 px-4 last:border-none justify-between items-center"
            key={item.id}
          >
            <div className="flex">
              <div className="flex w-full items-center gap-4">
                <div className="w-7 h-7 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-[17px] select-none">
                  {item.quantity}
                </div>
                <p className="text-gray-800 mr-3 font-medium text-[15px] capitalize">
                  {item.name}
                </p>
                {item.takeHome && <span className="text-xl ml-auto">🏠</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
