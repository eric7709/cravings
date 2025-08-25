"use client";

import { formatPrice } from "@/utils/formatPrice";
import { MenuItemAnalytics } from "../types/analytics";

export default function MenuItemAnalyticsCard(props: MenuItemAnalytics) {
  const {itemName, quantitySold, totalRevenue, averageRevenuePerOrder, } = props;
  
  // Get first letters of menu item name
  const getNamePrefix = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  return (
    <div className="w-full rounded-lg bg-white border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 flex items-center justify-center rounded-lg bg-emerald-500 text-white font-bold shadow-sm text-sm">
            {getNamePrefix(itemName)}
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">{itemName}</h3>
            <p className="text-xs text-gray-500">
              {quantitySold} sold
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-green-600">{formatPrice(totalRevenue)}</p>
          <p className="text-xs mt-1 text-gray-400">Average / Order : <span className="font-semibold text-sm text-gray-800">
            {formatPrice(averageRevenuePerOrder)} 
            </span>
            </p>
        </div>
      </div>
    </div>
  );
}