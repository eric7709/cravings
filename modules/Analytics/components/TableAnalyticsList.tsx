"use client";
import { Table } from "lucide-react";
import AnalyticsTitle from "./AnalyticsTitle";
import { useAnalyticsDataStore } from "../store/useAnalyticsDataStore";
import TableAnalyticsCard from "./TableAnalyticsCard";

export default function TableAnalyticsList() {
  const { analytics } = useAnalyticsDataStore();
  const tables = analytics?.topTables;
  if (!tables) return null;
  return (
    <div className="">
      <AnalyticsTitle
        title="Top Tables"
        bgColor="bg-green-100"
        iconBg="bg-green-700"
        iconColor="text-green-50"
        icon={Table}
      />
      <div className="flex flex-col gap-2">
        {tables.map((table) => (
          <TableAnalyticsCard key={table.tableId} {...table} />
        ))}
      </div>
    </div>
  );
}
