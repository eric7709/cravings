"use client";
import { useOrderDataSyncAndSubscribe } from "@/modules/Orders/hooks/useOrderDataSyncAndSubscribe";
import { useSyncTableDataStore } from "@/modules/Tables/hooks/useSyncTableDataStore";
import KitchenOrderHeader from "../../modules/Orders/components/KitchenOrderHeader";
import { usePendingOrderAlarm } from "@/modules/Orders/hooks/usePendingOrderAlarm";
import KitchenOrderList from "@/modules/Orders/components/KitchenOrderList";

export default function Base() {
  usePendingOrderAlarm();
  useSyncTableDataStore();
  useOrderDataSyncAndSubscribe();
  return (
    <div className="h-screen flex flex-col">
      <KitchenOrderHeader />
      <KitchenOrderList />
    </div>
  );
}
