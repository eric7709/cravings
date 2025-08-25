"use client";
import { useEffect } from "react";
import { useOrderSummary } from "../hooks/useOrderSummary";
import { useOrderSelectionStore } from "../store/useOrderSelectionStore";
import ModalOverlay from "@/components/ModalOverlay";
import OrderSummaryHeader from "./OrderSummaryHeader";
import OrderSummaryItems from "./OrderSummaryItems";
import OrderSummaryFooter from "./OrderSummaryFooter";

export default function OrderSummaryModal() {
  const {
    items,
    customer,
    unavailableIds,
    success,
    isSubmitting,
    total,
    activeModal,
    handleClick,
    handleConfirm,
    handleRemoveItem,
    closeModal,
    resetItems,
  } = useOrderSummary();
  const { toggleTakeHome } = useOrderSelectionStore();
  useEffect(() => {
    if (items.length === 0) {
      closeModal();
    }
  }, [items, closeModal]);

  return (
    <ModalOverlay isOpen={activeModal === "summary"} onClose={handleClick}>
      <div className="bg-white w-full max-w-[375px] rounded-xl mx-4 shadow-lg flex flex-col max-h-[80vh] border border-gray-200">
        <OrderSummaryHeader {...{ customer, success }} />
        <OrderSummaryItems
          {...{
            handleRemoveItem,
            items,
            success,
            isSubmitting,
            toggleTakeHome,
            unavailableIds,
          }}
        />
        <OrderSummaryFooter
          {...{
            closeModal,
            handleConfirm,
            isSubmitting,
            resetItems,
            success,
            total,
          }}
        />
      </div>
    </ModalOverlay>
  );
}
