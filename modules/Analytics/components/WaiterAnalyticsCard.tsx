"use client";

import { formatPrice } from "@/utils/formatPrice";
import { WaiterAnalytics } from "../types/analytics";

export default function WaiterAnalyticsCard(props: WaiterAnalytics) {
  const {
    averageOrdersPerDay,
    averageRevenuePerDay,
    averageRevenuePerOrder,
    totalOrders,
    totalRevenue,
    waiterId,
    waiterName,
  } = props;

  const getWaiterInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition min-h-[180px] flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-3">
        {/* Waiter Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-500 text-white font-semibold shadow text-sm">
            {getWaiterInitials(waiterName)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{waiterName}</h3>
            <p className="text-xs text-gray-500">ID: {waiterId.slice(-8)}</p>
          </div>
        </div>

        {/* Revenue */}
        <div className="text-left sm:text-right">
          <p className="text-lg font-bold text-green-600">
            {formatPrice(totalRevenue)}
          </p>
          <p className="text-xs text-gray-400">Total Revenue</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <p className="text-lg font-bold text-gray-900">{totalOrders}</p>
          <p className="text-xs text-gray-600">Total Orders</p>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <p className="text-lg font-bold text-gray-900">
            {averageOrdersPerDay.toFixed(1)}
          </p>
          <p className="text-xs text-gray-600">Orders per Day</p>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Avg Revenue per Order</span>
          <span className="text-sm font-semibold text-gray-800">
            {formatPrice(averageRevenuePerOrder)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Avg Revenue per Day</span>
          <span className="text-sm font-semibold text-gray-800">
            {formatPrice(averageRevenuePerDay)}
          </span>
        </div>
      </div>
    </div>
  );
}
