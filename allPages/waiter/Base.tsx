"use client";
import WaiterOrdersList from "@/modules/Employees/components/WaiterOrderList";
import { useUser } from "@/modules/Employees/hooks/useUser";
import { useOrderDataSyncAndSubscribe } from "@/modules/Orders/hooks/useOrderDataSyncAndSubscribe";
import Header from "@/modules/Tables/components/Header";
import WaiterTables from "@/modules/Tables/components/WaiterTables";
import { useSyncTableDataStore } from "@/modules/Tables/hooks/useSyncTableDataStore";
import { useState } from "react";

export type Active = "tables" | "orders";
export default function Base() {
  const { loading, user } = useUser();
  const [active, setActive] = useState<Active>("tables");
  useOrderDataSyncAndSubscribe()
  useSyncTableDataStore();
  return (
    <div className="p-4 flex flex-col bg-white h-screen">
      <Header {...{ active, setActive, loading, user }} />
      {active == "tables" && <WaiterTables {...{loading, user}}/>}
      {active == "orders" && <WaiterOrdersList {...{loading, user}}/>}
    </div>
  );
}
