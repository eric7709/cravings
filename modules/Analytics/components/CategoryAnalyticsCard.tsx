// CategoryAnalyticsCard.tsx
"use client";
import { formatPrice } from "@/utils/formatPrice";
import { CategoryAnalytics } from "../types/analytics";

export default function CategoryAnalyticsCard(props: CategoryAnalytics) {
  const { categoryName, itemsSold, totalRevenue, averageRevenuePerOrder, categoryId } = props;
  
  // Calculate additional metrics
  const averageRevenuePerItem = itemsSold > 0 ? totalRevenue / itemsSold : 0;
  
  // Get category initials for icon
  const getCategoryInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="w-full rounded-lg bg-white border border-gray-200 p-5 shadow-sm hover:shadow-md transition min-h-[140px] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 flex items-center justify-center rounded-lg bg-indigo-500 text-white font-bold shadow-sm text-sm">
            {getCategoryInitials(categoryName)}
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              {categoryName}
            </h3>
            <p className="text-xs text-gray-500">
              ID: {categoryId.slice(-8)}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-indigo-600">
            {formatPrice(totalRevenue)}
          </p>
          <p className="text-xs text-gray-400">Total Revenue</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center p-2 bg-gray-50 rounded-md">
          <p className="text-sm font-bold text-gray-900">{itemsSold}</p>
          <p className="text-xs text-gray-600">Items Sold</p>
        </div>
        
        <div className="text-center p-2 bg-gray-50 rounded-md">
          <p className="text-sm font-bold text-gray-900">{formatPrice(averageRevenuePerOrder)}</p>
          <p className="text-xs text-gray-600">Avg/Order</p>
        </div>
        
        <div className="text-center p-2 bg-gray-50 rounded-md">
          <p className="text-sm font-bold text-gray-900">{formatPrice(averageRevenuePerItem)}</p>
          <p className="text-xs text-gray-600">Avg/Item</p>
        </div>
      </div>
    </div>
  );
}