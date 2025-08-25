"use client";
import AdminOrderList from "@/modules/Orders/components/AdminOrderList";
import AdminOrderHeader from "@/modules/Orders/components/AdminOrderHeader";
import { useSyncTableDataStore } from "@/modules/Tables/hooks/useSyncTableDataStore";
import { useOrderDataSyncAndSubscribe } from "@/modules/Orders/hooks/useOrderDataSyncAndSubscribe";

export default function Base() {
  useOrderDataSyncAndSubscribe();
  useSyncTableDataStore();
  return (
    <div className="h-screen  flex flex-col">
      <AdminOrderHeader />
      <AdminOrderList />
    </div>
  );
}
