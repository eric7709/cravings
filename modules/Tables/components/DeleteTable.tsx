"use client";
import { toast } from "react-toastify";
import { useTableSelectionStore } from "../store/useTableSelectionStore";
import { useDeleteTable } from "../hooks/useTableServices";
import { useTableDataStore } from "../store/useTableDataStore";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

export default function DeleteTable() {
  const { activeModal, closeModal, activeTable, clearActiveTable } =
    useTableSelectionStore();
  const { mutate, isPending } = useDeleteTable();
  const { removeTable } = useTableDataStore();

  const handleDelete = () => {
    if (!activeTable) return;
    mutate(activeTable.id, {
      onSuccess: () => {
        toast.success("✅ Table deleted successfully");
        removeTable(activeTable.id);
        closeModal();
        clearActiveTable();
      },
      onError: (error: any) => {
        toast.error(error?.message || "❌ Failed to delete table");
      },
    });
  };

  return (
    <ConfirmDeleteModal
      isOpen={activeModal === "delete"}
      type="table"
      name={`${activeTable?.name} - #${activeTable?.tableNumber}`}
      onClose={() => {
        closeModal();
        clearActiveTable();
      }}
      onConfirm={handleDelete}
      isLoading={isPending}
    />
  );
}
