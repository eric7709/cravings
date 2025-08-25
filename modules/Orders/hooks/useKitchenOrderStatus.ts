"use client"

import { useEffect, useState } from "react";
import { Order } from "../types/orders";
import { useUpdateOrderStatus } from "./useOrderServices";
import { Employee } from "@/modules/Employees/types/employee";
import { useEmployeeDataStore } from "@/modules/Employees/store/useEmployeeDataStore";
import { useOrderDataStore } from "../store/useOrderDataStore";

const nextStatusMap: Record<Order["status"], Order["status"]> = {
  pending: "completed",
  completed: "paid",
  paid: "paid",
  cancelled: "cancelled",
  all: "all",
};

export const statusStyles: Record<
  Order["status"],
  { text: string; bg: string; disabled?: boolean }
> = {
  all: { text: "All", bg: "bg-gray-300", disabled: true },
  pending: { text: "Start Preparing", bg: "bg-yellow-500" },
  completed: { text: "Complete", bg: "bg-blue-500" },
  paid: { text: "Paid", bg: "bg-green-600", disabled: true }, // Updated to green-600
  cancelled: { text: "Cancelled", bg: "bg-red-500", disabled: true },
};

export function useKitchenOrderStatus(order: Order) {
  const [status, setStatus] = useState<Order["status"]>(order.status);
  const [waiter, setWaiter] = useState<Employee | undefined>();
  const { employees } = useEmployeeDataStore();
  const { mutate, isPending, isSuccess } = useUpdateOrderStatus();
  const {fetchOrders, refetchOrders} = useOrderDataStore()

  useEffect(() => {
    if (employees.length > 0) {
      const employee = employees.find((el) => el.id === order.waiterId);
      if (employee) {
        setWaiter(employee);
      }
    }
  }, [employees]);

  const handleStatusUpdate = () => {
    const newStatus = nextStatusMap[status];
    if (newStatus === status || status === "all") return;
    setStatus(newStatus);
    mutate({ id: order.id, status: newStatus });
    refetchOrders()
  };

  const readyForPrinting =
    status === "completed" || status === "paid";

  const currentDateTime = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return {
    status,
    waiter,
    isPending,
    isSuccess,
    style: statusStyles[status],
    handleStatusUpdate,
    readyForPrinting,
    currentDateTime,
  };
}