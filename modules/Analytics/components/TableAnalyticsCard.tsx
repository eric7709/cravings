"use client";

import { formatPrice } from "@/utils/formatPrice";
import { TableAnalytics } from "../types/analytics";

export default function TableAnalyticsCard(props: TableAnalytics) {
  const {
    tableName,
    tableNumber,
    totalRevenue,
    tableId,
    totalOrders,
    averageSpend,
  } = props;

  return (
    <div className="w-full rounded-xl bg-white border border-gray-200 p-5 shadow-sm hover:shadow-md transition min-h-[140px] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 flex items-center justify-center rounded-lg bg-blue-500 text-white font-bold shadow-sm">
            {tableNumber}
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              {tableName}
            </h3>
            <p className="text-xs text-gray-500">
              ID: {tableId.slice(-8)}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-green-600">
            {formatPrice(totalRevenue)}
          </p>
          <p className="text-xs text-gray-400">Total Revenue</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex items-center justify-between">
        <div className="text-center p-2 bg-gray-50 rounded-lg flex-1 mr-2">
          <p className="text-lg font-bold text-gray-900">{totalOrders}</p>
          <p className="text-xs text-gray-600">Total Orders</p>
        </div>
        
        <div className="text-center p-2 bg-gray-50 rounded-lg flex-1 ml-2">
          <p className="text-lg font-bold text-gray-900">{formatPrice(averageSpend)}</p>
          <p className="text-xs text-gray-600">Average Spend</p>
        </div>
      </div>
    </div>
  );
}