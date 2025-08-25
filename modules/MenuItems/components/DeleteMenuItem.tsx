"use client";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import { useMenuItemSelectionStore } from "../store/useMenuItemSelectionStore";
import { useDeleteMenuItem } from "../hooks/useMenuItemsServices";
import { toast } from "react-toastify";
import { useMenuItemDataStore } from "../store/useMenuItemsDataStore";

export default function DeleteMenuItem() {
  const { selectedMenuItem, closeModal, activeModal } = useMenuItemSelectionStore();
  const { mutate, isPending } = useDeleteMenuItem();
  const { removeMenuItem } = useMenuItemDataStore();

  const handleDelete = () => {
    console.log(selectedMenuItem)
    if (!selectedMenuItem?.id) return;
    mutate(selectedMenuItem.id, {
      onSuccess: () => {
        removeMenuItem(selectedMenuItem.id);
        toast.success("Menu Item deleted successfully");
        closeModal();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <ConfirmDeleteModal
      isOpen={activeModal === "delete"}
      type="menu item"
      name={selectedMenuItem?.name}
      onClose={closeModal}
      onConfirm={handleDelete}
      isLoading={isPending}
    />
  );
}
