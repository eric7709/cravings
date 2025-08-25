"use client";

import { useEmployeeDataStore } from "@/modules/Employees/store/useEmployeeDataStore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTableDataStore } from "../store/useTableDataStore";
import { useTableSelectionStore } from "../store/useTableSelectionStore";
import { useAllocateWaiter } from "../hooks/useTableServices";
import { useGetEmployees } from "@/modules/Employees/hooks/useEmployeesServices";
import ModalOverlay from "@/components/ModalOverlay";

export default function AllocateModal() {
  const [waiterId, setWaiterId] = useState("");
  const { employees, setEmployees } = useEmployeeDataStore();
  const { updateTable } = useTableDataStore();
  const { activeModal, closeModal, activeTable, clearActiveTable } =
    useTableSelectionStore();
  const { mutate, isPending } = useAllocateWaiter();
  const { refetch } = useGetEmployees();

  useEffect(() => {
    if (activeModal === "allocate") {
      const fetchEmployees = async () => {
        try {
          const { data: freshData, error } = await refetch();
          if (error) {
            toast.error("Failed to fetch employees");
            console.error("Fetch employees error:", error);
            return;
          }
          if (freshData) {
            setEmployees(freshData);
          } else {
            toast.error("No employee data available");
          }
        } catch (err) {
          toast.error("Error fetching employees");
          console.error("Fetch employees error:", err);
        }
      };
      fetchEmployees();
    }
  }, [activeModal, refetch, setEmployees]);

  useEffect(() => {
    if (activeTable?.waiterId) setWaiterId(activeTable.waiterId);
  }, [activeTable]);

  const handleSubmit = async () => {
    if (!activeTable) return toast.error("No table selected");
    if (!waiterId.trim()) return toast.error("Please select a waiter");

    mutate(
      {
        tableId: activeTable.id,
        waiterId,
      },
      {
        onSuccess: (updatedTable) => {
          toast.success("✅ Waiter allocated successfully");
          updatedTable && updateTable(activeTable.id, updatedTable);
          clearActiveTable();
          closeModal();
          setWaiterId("");
        },
        onError: (error: any) => {
          toast.error(error?.message || "❌ Failed to allocate waiter");
        },
      }
    );
  };

  const waiters = employees.filter((el) => el.role && /waiter/i.test(el.role));

  return (
    <ModalOverlay isOpen={activeModal === "allocate"} onClose={closeModal}>
      <div className="w-[340px] p-6 rounded-2xl shadow-xl border bg-gradient-to-br from-white to-blue-50">
        <h2 className="text-xl font-bold text-center text-blue-700">
          Allocate Waiter
        </h2>

        <div className="mt-4 space-y-1 text-sm text-gray-600 text-center">
          <p>
            <span className="font-medium text-gray-800">Table:</span>{" "}
            {activeTable?.name}
          </p>
          <p>
            <span className="font-medium text-gray-800">Number:</span> #
            {activeTable?.tableNumber}
          </p>
        </div>

        <div className="mt-6 text-left">
          <label
            className="block text-sm font-medium mb-1 text-gray-700"
            htmlFor="waiterId"
          >
            Select Waiter
          </label>
          <select
            id="waiterId"
            value={waiterId}
            onChange={(e) => setWaiterId(e.target.value)}
            disabled={isPending}
            className="w-full px-3 py-2 border rounded-lg text-sm capitalize 
              focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none
              transition hover:border-blue-300 disabled:bg-gray-100"
          >
            <option value="">-- Choose Waiter --</option>
            {waiters.map((waiter) => (
              <option key={waiter.id} value={waiter.id}>
                {waiter.firstName} {waiter.lastName}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isPending}
          className="w-full mt-6 py-3 rounded-lg bg-blue-600 text-white text-sm font-semibold 
            shadow-md hover:bg-blue-700 active:scale-95 transition 
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <span className="flex items-center justify-center space-x-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Allocating...</span>
            </span>
          ) : (
            "Allocate Waiter"
          )}
        </button>
      </div>
    </ModalOverlay>
  );
}
