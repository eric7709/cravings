"use client";
import { Order } from "@/modules/Orders/types/orders";
import { useUpdateOrder } from "@/modules/Orders/hooks/useOrderServices";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTableDataStore } from "@/modules/Tables/store/useTableDataStore";
import { Table } from "@/modules/Tables/types/table";
import { toast } from "react-toastify";
import { useOrderDataStore } from "../store/useOrderDataStore";
import { TableService } from "@/modules/Tables/services/tableServices";
import { OrderService } from "../services/orderServices";

type Props = {
  order: Order;
  paymentMethod: string;
  setError: Dispatch<SetStateAction<string>>;
  error: string;
};
export default function CashierOrderCardFooter(props: Props) {
  const { order, paymentMethod, setError, error } = props;
  const { tables } = useTableDataStore();
  const queryClient = useQueryClient();
  const { mutate, isPending: isLoading } = useUpdateOrder();
  const { updateOrder } = useOrderDataStore();
  const [table, setTable] = useState<Table | null>(null);
  useEffect(() => {
    const table = TableService.getTable(tables, order.tableId as string)
    if (table) setTable(table);
  }, [tables, order.tableId]);
  const nextStatus = OrderService.getNextOrderStatus(order)
  const buttonText = OrderService.getOrderButtonText(order)
  const handleUpdateStatus = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (order.status === "cancelled") return;
    const next = nextStatus;
    if (next === "paid" && !paymentMethod) {
      setError("Please select a payment method");
      toast.error("Please select a payment method");
      return;
    }
    setError("");
    const updates: any = { status: next };
    if (next === "paid" && paymentMethod) {
      updates.paymentMethod = paymentMethod;
    }
    mutate(
      { id: order.id, updates },
      {
        onSuccess: () => {
          const localUpdates: any = { status: next };
          if (next === "paid" && paymentMethod) {
            localUpdates.paymentMethod = paymentMethod;
          }
          updateOrder(order.id, localUpdates); // Update local state
          queryClient.invalidateQueries({ queryKey: ["orders"] }); // Trigger refetch
          if (order.status === "pending" && next === "completed") {
            toast.success(`Order for table #${table?.tableNumber} is being prepared ✅`);
          }
          if (order.status === "completed" && next === "paid") {
            toast.success(`Order #${table?.tableNumber} has been paid ✅`);
          }
        },
        onError: (error) => {
          console.error("Update failed:", error);
          toast.error("Failed to update order status");
        },
      }
    );
  };

  useEffect(() => {
    if (paymentMethod && error) {
      setError("");
    }
  }, [paymentMethod, error]);

  return (
    <footer className="p-4 flex-1 flex flex-col justify-end border-t border-gray-100">
      <button
        onClick={handleUpdateStatus}
        disabled={isLoading || order.status === "paid" || order.status === "cancelled"}
        className={`w-full mt-auto rounded-md py-3 font-semibold text-sm transition-transform duration-150
            ${
              order.status === "cancelled"
                ? "bg-red-300 text-white cursor-not-allowed"
                : order.status === "pending"
                ? "bg-amber-500 text-white shadow-md cursor-pointer hover:bg-amber-600 active:scale-95"
                : isLoading || order.status === "paid"
                ? "bg-green-500 text-white cursor-not-allowed"
                : "bg-cyan-500 text-white shadow-md hover:bg-green-700 active:scale-95 cursor-pointer"
            }`}
      >
        {isLoading ? "Loading..." : buttonText}
      </button>
    </footer>
  );
}