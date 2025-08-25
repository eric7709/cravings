"use client";
import { useAnalyticsDataStore } from "../store/useAnalyticsDataStore";
import MenuItemAnalyticsCard from "./MenuItemAnalyticsCard";
import AnalyticsTitle from "./AnalyticsTitle";
import { Menu } from "lucide-react";

export default function MenuItemAnalyticsList() {
  const { analytics } = useAnalyticsDataStore();
  const menuItems = analytics?.topMenuItems
   if (!menuItems || menuItems.length === 0) {
    return <p>No Menu Item data available.</p>;
  }
  return (
    <div className="">
      <AnalyticsTitle
        title="Most Sold Menu Item"
        bgColor="bg-rose-100"
        icon={Menu}
        iconBg="bg-rose-800"
        iconColor="text-rose-50"
      />
      <div className="flex gap-2 flex-col">
        {menuItems.map((menuItem) => (
          <MenuItemAnalyticsCard key={menuItem.menuItemId} {...menuItem} />
        ))}
      </div>
    </div>
  );
}
