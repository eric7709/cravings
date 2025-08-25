"use client";
import AdminOrderCard from "./AdminOrderCard";
import { useOrderDataStore } from "../store/useOrderDataStore";
import NoResultFound from "@/components/NoResultFound";
import Loader from "@/components/Loader";

export default function AdminOrderList() {
  const { orders, isLoading } = useOrderDataStore();
  if (isLoading) return <Loader />;
  if (!isLoading && orders.length === 0) return <NoResultFound />;
  return (
    <div className="flex-1 relative z-20 overflow-y-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 gap-3">
        {orders.map((order) => (
          <AdminOrderCard key={order.id} {...order} />
        ))}
      </div>
    </div>
  );
}
