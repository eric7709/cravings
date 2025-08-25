"use client";
import { useTableDataStore } from "@/modules/Tables/store/useTableDataStore";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useOrderDataStore } from "../store/useOrderDataStore";
import { Order } from "../types/orders";
import { useUpdateOrderStatus } from "../hooks/useOrderServices";
import { Table } from "@/modules/Tables/types/table";
import { TableService } from "@/modules/Tables/services/tableServices";
import { CARD_STYLES } from "../constants/cardStyles";
import AdminOrderCardHeader from "./AdminOrderCardHeader";
import AdminOrderCardMetaData from "./AdminOrderCardMetaData";
import AdminOrderCardCancelModal from "./AdminOrderCardCancelModal";
import AdminOrderCardRenderItemsAndTotal from "./AdminOrderCardRenderItemsAndTotal";


export default function AdminOrderCard(order : Order) {
  const { tables } = useTableDataStore();
  const { updateOrder } = useOrderDataStore();
  const { mutate: updateOrderStatus, isPending } = useUpdateOrderStatus();
  const [currentTable, setCurrentTable] = useState<Table | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  useEffect(() => {
    const foundTable =TableService.getTable(tables, order.tableId as string);
    setCurrentTable(foundTable);
  }, [tables, order.tableId]);
  const canCancelOrder = (): boolean => {
    return order.status !== "cancelled" && order.status !== "paid";
  };

  const handleOrderCancellation = (): void => {
    if (!canCancelOrder()) return;
    updateOrderStatus(
      { id: order.id, status: "cancelled" },
      {
        onSuccess: () => {
          updateOrder(order.id, { status: "cancelled" });
          toast.success(`Order #${order.invoiceId} cancelled`);
          setShowCancelModal(false);
        },
        onError: () => {
          toast.error(`Failed to cancel order #${order.invoiceId}`);
          setShowCancelModal(false);
        },
      }
    );
  };

  const handleCancelClick = (): void => {
    setShowCancelModal(true);
  };

  return (
    <div
      className={CARD_STYLES.container}
      role="article"
      aria-label={`Order card for invoice ${order.invoiceId}`}
    >
      <AdminOrderCardHeader {...{ order, handleCancelClick, isPending }} />
      <AdminOrderCardMetaData
        {...{ count: order.items.length, currentTable, order }}
      />
      <AdminOrderCardCancelModal
        {...{
          order,
          handleOrderCancellation,
          isPending,
          setShowCancelModal,
          showCancelModal,
        }}
      />
      <AdminOrderCardRenderItemsAndTotal {...order} />
    </div>
  );
}
