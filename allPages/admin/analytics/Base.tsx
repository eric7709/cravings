"use client";
import { useEffect, useState } from "react";
import CustomerAnalyticsList from "@/modules/Analytics/components/CustomerAnalyticsList";
import CategoryAnalyticsList from "@/modules/Analytics/components/CategoryAnalyticsList";
import MenuItemAnalyticsList from "@/modules/Analytics/components/MenuItemAnalyticsList";
import WaiterAnalyticsList from "@/modules/Analytics/components/WaiterAnalyticsList";
import TableAnalyticsList from "@/modules/Analytics/components/TableAnalyticsList";
import AnalyticsHeader from "@/modules/Analytics/components/AnalyticsHeader";
import MetricList from "@/modules/Analytics/components/MetricList";
import { useAnalyticsDataStore } from "@/modules/Analytics/store/useAnalyticsDataStore";
import MostAnalytics from "@/modules/Analytics/components/MostAnalytics";
import { Calendar, Clock, CreditCard } from "lucide-react";
import Loader from "@/components/Loader";

export default function Base() {
  const { fetchAnalytics, analytics, error } = useAnalyticsDataStore();
  const [loading, setLoading] = useState(true);
  const mostSellingDays = analytics?.mostSellingDaysOfWeek;
  const mostSellingTimesOfDay = analytics?.mostSellingTimesOfDay;
  const mostUsedPaymentMethods = analytics?.mostUsedPaymentMethods;

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      await fetchAnalytics();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(analytics);
  }, [analytics, error]);

  useEffect(() => {
    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="grid h-screen place-content-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex flex-col">
        <AnalyticsHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Failed to Load Analytics
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={loadAnalytics}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (
    analytics?.metrics[0].total == 0 ||
    analytics?.metrics[1].total == 0 ||
    analytics?.metrics[2].total == 0 ||
    analytics?.metrics[3].total == 0
  ) {
    return (
      <div className="h-screen flex flex-col">
        <AnalyticsHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              No Analytics Data
            </h2>
            <p className="text-gray-600 mb-4">
              No data available for the selected time period.
            </p>
            <button
              onClick={loadAnalytics}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <AnalyticsHeader />
      <div className="p-4 z-20 flex flex-col gap-10 relative flex-1 overflow-y-auto">
        <MetricList />
        <MenuItemAnalyticsList />
        <CategoryAnalyticsList />
        <TableAnalyticsList />
        <CustomerAnalyticsList />
        <WaiterAnalyticsList />
        <MostAnalytics
          data={mostSellingDays}
          icon={Calendar}
          title="Most Selling Days of the Week"
          bgColor="bg-blue-100"
          iconBg="bg-blue-600"
          iconColor="text-blue-50"
        />
        <MostAnalytics
          icon={Clock}
          data={mostSellingTimesOfDay}
          bgColor="bg-purple-100"
          iconBg="bg-purple-600"
          iconColor="text-purple-50"
          title="Most Selling Times of the Day"
        />
        <MostAnalytics
          icon={CreditCard}
          data={mostUsedPaymentMethods}
          title="Most Used Payment Method"
          bgColor="bg-green-100"
          iconBg="bg-green-600"
          iconColor="text-green-50"
        />
      </div>
    </div>
  );
}
