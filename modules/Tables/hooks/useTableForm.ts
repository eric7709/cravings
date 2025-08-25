"use client";
import { useEmployeeDataStore } from "@/modules/Employees/store/useEmployeeDataStore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTableSelectionStore } from "../store/useTableSelectionStore";
import { useTableDataStore } from "../store/useTableDataStore";
import { useCreateTable, useUpdateTable } from "./useTableServices";
import { TABLE_FORM_VALUE_CREATE } from "../constants/tables";
import { TableFormError, TableFormInput } from "../types/table";
import { TableService } from "../services/tableServices";

export const useTableForm = () => {
  const { activeTable, activeModal, closeModal, clearActiveTable } =
    useTableSelectionStore();
  const { employees } = useEmployeeDataStore();
  const { addTable, updateTable } = useTableDataStore();
  const { mutate: createTable, isPending: isPendingCreate } = useCreateTable();
  const { mutate: updateTableMutation, isPending: isPendingUpdate } =
    useUpdateTable();
  const [form, setForm] = useState<TableFormInput>(TABLE_FORM_VALUE_CREATE);
  const [errors, setErrors] = useState<Partial<TableFormError>>({});
  const isUpdateMode = activeModal === "update";
  const isCreateMode = activeModal === "create";
  const isPending = isPendingCreate || isPendingUpdate;
  useEffect(() => {
    if (isUpdateMode && activeTable) {
      const data = TableService.setUpFormForUpdate(activeTable);
      setForm(data);
    } else {
      setForm(TABLE_FORM_VALUE_CREATE);
    }
    setErrors({});
  }, [activeTable, isUpdateMode]);
  const handleChange = (field: keyof TableFormInput, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };
  const handleSubmit = () => {
    const { isValid, errors } = TableService.validate(form);
    if (!isValid) {
      return setErrors(errors);
    }
    const payload = TableService.createPayload(form);
    if (isCreateMode) {
      createTable(payload, {
        onSuccess: (newTable) => {
          toast.success("✅ Table created successfully");
          addTable(newTable);
          setForm(TABLE_FORM_VALUE_CREATE);
          clearActiveTable();
          closeModal();
        },
        onError: (error: any) => {
          toast.error(error?.message || "❌ Failed to create table");
        },
      });
    }
    if (isUpdateMode && activeTable) {
      updateTableMutation(
        { id: activeTable.id, updates: payload },
        {
          onSuccess: () => {
            toast.success("✅ Table updated successfully");
            updateTable(activeTable.id, payload);
            setForm(TABLE_FORM_VALUE_CREATE);
            clearActiveTable();
            closeModal();
          },
          onError: (error: any) => {
            toast.error(error?.message || "❌ Failed to update table");
          },
        }
      );
    }
  };
  return {
    form,
    errors,
    handleChange,
    handleSubmit,
    isPending,
    isCreateMode,
    isUpdateMode,
    employees,
    closeModal,
  };
};
