"use client";
import { useAnalyticsDataStore } from "../store/useAnalyticsDataStore";
import AnalyticsTitle from "./AnalyticsTitle";
import CategoryAnalyticsCard from "./CategoryAnalyticsCard";
import { ChartBarStacked } from "lucide-react";

export default function CategoryAnalyticsList() {
  const { analytics } = useAnalyticsDataStore();
  const categories = analytics?.topCategories;
  if (categories?.length === 0) {
    return <p>No category data available.</p>;
  }
  return (
    <div className="">
      <AnalyticsTitle
        title="Top Categories"
        bgColor="bg-amber-100"
        iconBg="bg-amber-700"
        iconColor="text-amber-50"
        icon={ChartBarStacked}
      />
      <div className="flex flex-col gap-2">
        {categories &&
          categories.map((category) => (
            <CategoryAnalyticsCard key={category.categoryId} {...category} />
          ))}
      </div>
    </div>
  );
}
