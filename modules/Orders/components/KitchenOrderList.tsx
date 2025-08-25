"use client"
import { useOrderDataStore } from "../store/useOrderDataStore";
import KitchenOrderCard from "./KitchenOrderCard";

export default function KitchenOrderList() {
  const { orders } = useOrderDataStore();
  return (
      <div className="flex-1 flex flex-col overflow-y-auto ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5">
          {orders.filter(el => el.status == "pending").map((order) => (
            <KitchenOrderCard key={order.id} {...order} />
          ))}
        </div>
      </div>
  );
}
