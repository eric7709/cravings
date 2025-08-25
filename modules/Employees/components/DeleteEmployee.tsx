"use client";
import { toast } from "react-toastify";
import { useEmployeeSelectionStore } from "../store/useEmployeeSelectionStore";
import { useEmployeeDataStore } from "../store/useEmployeeDataStore";
import { useDeleteEmployee } from "../hooks/useEmployeesServices";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

export default function DeleteEmployee() {
  const { activeModal, selectedEmployee, closeModal, clearEmployee } =
    useEmployeeSelectionStore();
  const { removeStoreEmployee } = useEmployeeDataStore();
  const { mutate, isPending } = useDeleteEmployee();
  const handleDelete = () => {
    if (!selectedEmployee) return;
    mutate(selectedEmployee.id!, {
      onSuccess: () => {
        removeStoreEmployee(selectedEmployee.id!);
        clearEmployee();
        toast.success("Employee deleted successfully");
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
      type="Employee"
      name={`${selectedEmployee?.firstName ?? ""} ${
        selectedEmployee?.lastName ?? ""
      }`}
      onClose={() => {
        closeModal();
        clearEmployee();
      }}
      onConfirm={handleDelete}
      isLoading={isPending}
    />
  );
}
