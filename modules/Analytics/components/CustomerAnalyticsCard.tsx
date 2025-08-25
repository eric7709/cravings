"use client";
import { formatPrice } from "@/utils/formatPrice";
import { CustomerAnalytics } from "../types/analytics";

export default function CustomerAnalyticsCard(props: CustomerAnalytics) {
  const {
    averageOrdersPerVisit,
    averageRevenuePerOrder,
    averageRevenuePerVisit,
    customerId,
    customerName,
    lastVisit,
    totalOrders,
    totalRevenue,
    totalVisits,
  } = props;

  // Format date for better display
  const formatLastVisit = (dateString: string) => {
    if (!dateString) return "No visits";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition min-h-[180px] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-yellow-500 text-white font-semibold shadow text-sm">
            {getInitials(customerName)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{customerName}</h3>
            <p className="text-xs text-gray-500">ID: {customerId.slice(-8)}</p>
          </div>
        </div>
        <span className="text-xs text-gray-500 italic">
          {formatLastVisit(lastVisit)}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <p className="text-lg font-bold text-gray-900">{totalVisits}</p>
          <p className="text-xs text-gray-600">Total Visits</p>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <p className="text-lg font-bold text-gray-900">{totalOrders}</p>
          <p className="text-xs text-gray-600">Total Orders</p>
        </div>
      </div>

      {/* Revenue and Averages */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total Revenue</span>
          <span className="text-xl font-bold text-green-600">
            {formatPrice(totalRevenue)}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Avg per Order</span>
          <span className="text-sm font-semibold text-gray-800">
            {formatPrice(averageRevenuePerOrder)}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Avg per Visit</span>
          <span className="text-sm font-semibold text-gray-800">
            {formatPrice(averageRevenuePerVisit)}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Orders per Visit</span>
          <span className="text-sm font-semibold text-gray-800">
            {averageOrdersPerVisit.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}