"use client";
import { toast } from "react-toastify";
import { useState } from "react";
import { useTableSelectionStore } from "../store/useTableSelectionStore";
import { useTableDataStore } from "../store/useTableDataStore";
import { useDeallocateWaiter } from "../hooks/useTableServices";
import ModalOverlay from "@/components/ModalOverlay";

export default function DeallocateModal() {
  const { activeModal, closeModal, activeTable, clearActiveTable } =
    useTableSelectionStore();
  const { updateTable } = useTableDataStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutateAsync } = useDeallocateWaiter();

  const handleDeallocate = async () => {
    if (!activeTable?.id) {
      toast.error("❌ No table selected");
      return;
    }
    setIsSubmitting(true);
    try {
      await mutateAsync(activeTable.id, {
        onSuccess: (data) => {
          if (data) {
            updateTable(activeTable.id, data);
          }
          clearActiveTable();
          toast.success("✅ Waiter deallocated");
          closeModal();
        },
        onError: (error: any) => {
          console.error("Deallocate error:", error);
          toast.error("❌ Failed to deallocate waiter");
        },
        onSettled: () => setIsSubmitting(false),
      });
    } catch (error) {
      console.error("Deallocate error:", error);
      toast.error("❌ Failed to deallocate waiter");
      setIsSubmitting(false);
    }
  };

  return (
    <ModalOverlay isOpen={activeModal === "deallocate"} onClose={closeModal}>
      <div className="w-[300px] bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-100 bg-red-600">
          <h2 className="text-base text-center font-semibold text-white">
            Deallocate Waiter
          </h2>
        </div>

        {/* Content */}
        <div className="p-4 text-center">
          <div className="text-sm text-gray-700">
            <p>
              Are you sure you want to deallocate{" "}
              <span className="font-bold">
                {activeTable?.waiter?.firstName}
              </span>{" "}
              from this table?
            </p>
            <p className="font-semibold capitalize mt-2 text-base text-red-600">
              #{activeTable?.tableNumber} - {activeTable?.name || "this table"}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50 flex gap-2">
          <button
            onClick={closeModal}
            disabled={isSubmitting}
            className="flex-1 py-3 cursor-pointer rounded-md text-[13px] font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 active:scale-95 transition-all duration-200 shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleDeallocate}
            disabled={isSubmitting}
            className={`flex-1 py-3 cursor-pointer rounded-md text-[13px] font-medium text-white transition-all duration-200 shadow-sm ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 active:scale-95"
            }`}
          >
            {isSubmitting ? "Deallocating..." : "Confirm"}
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}
