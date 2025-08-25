"use client";
import CashierOrderHeader from "@/modules/Orders/components/CashierOrderHeader";
import CashierOrderList from "@/modules/Orders/components/CashierOrderList";
import { useOrderDataSyncAndSubscribe } from "@/modules/Orders/hooks/useOrderDataSyncAndSubscribe";
import { usePendingOrderAlarm } from "@/modules/Orders/hooks/usePendingOrderAlarm";
import { useSyncTableDataStore } from "@/modules/Tables/hooks/useSyncTableDataStore";

export default function Base() {
  usePendingOrderAlarm();
  useSyncTableDataStore();
  useOrderDataSyncAndSubscribe();
  return (
    <div className="flex flex-col h-screen">
      <CashierOrderHeader />
      <CashierOrderList />
    </div>
  );
}

