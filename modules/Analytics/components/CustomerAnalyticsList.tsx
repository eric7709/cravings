"use client";
import { UserRound } from "lucide-react";
import AnalyticsTitle from "./AnalyticsTitle";
import CustomerAnalyticsCard from "./CustomerAnalyticsCard";
import { useAnalyticsDataStore } from "../store/useAnalyticsDataStore";

export default function CustomerAnalyticsList() {
  const { analytics } = useAnalyticsDataStore();
  const customers = analytics?.topCustomers;
  if (!customers || customers.length === 0) {
    return <p>No customer data available.</p>;
  }
  return (
    <div className="">
      <AnalyticsTitle
        title="Top Customers"
        bgColor="bg-purple-100"
        iconColor="text-purple-50"
        iconBg="bg-purple-600"
        icon={UserRound}
      />
      <div className="flex flex-col gap-2">
        {customers.map((customer) => (
          <CustomerAnalyticsCard key={customer.customerId} {...customer} />
        ))}
      </div>
    </div>
  );
}
