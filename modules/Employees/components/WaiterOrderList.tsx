"use client";
import { useOrderDataStore } from "@/modules/Orders/store/useOrderDataStore";
import { Employee } from "../types/employee";
import WaiterOrderCard from "./WaiterOrderCard";
import { OrderService } from "@/modules/Orders/services/orderServices";

type Props = {
  loading: boolean;
  user: Employee | null;
};

export default function WaiterOrdersList({ loading, user }: Props) {
  const { orders } = useOrderDataStore();

  const waiterOrders = OrderService.getWaitersPendingOrders(orders, user);
  return (
    <div className="flex-1 overflow-y-auto space-y-4 mt-4">
      {waiterOrders?.map((order) => (
        <WaiterOrderCard {...order} key={order.id} />
      ))}
    </div>
  );
}
