"use client";
import { UserRound } from "lucide-react";
import AnalyticsTitle from "./AnalyticsTitle";
import WaiterAnalyticsCard from "./WaiterAnalyticsCard";
import { useAnalyticsDataStore } from "../store/useAnalyticsDataStore";

export default function WaiterAnalyticsList() {
  const { analytics } = useAnalyticsDataStore();
  const waiters = analytics?.topWaiters;
  if (!waiters) return null;
  return (
    <div className="">
      <AnalyticsTitle
        title="Top Waiter"
        bgColor="bg-blue-100"
        iconBg="bg-blue-600"
        iconColor="text-blue-50"
        icon={UserRound}
      />
      <div className="flex flex-col gap-2">
        {waiters.map((waiter) => (
          <WaiterAnalyticsCard key={waiter.waiterId} {...waiter} />
        ))}
      </div>
    </div>
  );
}
