"use client";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useGetAllTables } from "@/modules/Tables/hooks/useTableServices";
import { useEmployeeSelectionStore } from "../store/useEmployeeSelectionStore";
import { useEmployeeDataStore } from "../store/useEmployeeDataStore";
import { useUser } from "./useUser";
import { CreateEmployee, Employee, UpdateEmployee } from "../types/employee";
import { useEmployeeRegister, useUpdateEmployee } from "./useEmployeesServices";

type FieldError = {
  field?: string;
  message: string;
};

export function useCreateUpdateStaff() {
  const { selectedEmployee, activeModal, closeModal } =
    useEmployeeSelectionStore();
  const { addStoreEmployee, updateStoreEmployee } = useEmployeeDataStore();
  const { user, loading: authLoading } = useUser();
  const isEditing = activeModal === "update" && !!selectedEmployee;
  const [isActive, setIsActive] = useState(false);

  const [form, setForm] = useState<CreateEmployee>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    role: "",
    registeredBy: user?.id ?? "",
  });

  const { refetch } = useGetAllTables();

  const [error, setError] = useState<FieldError | null>(null);
  const [successMsg, setSuccessMsg] = useState("");

  const { mutate: registerEmployeeRequest, isPending: loadingCreateEmployee } =
    useEmployeeRegister({
      onSuccess: (data: Employee) => {
        addStoreEmployee(data);
        resetForm();
        closeModal();
        toast.success("Employee Created Successfully");
      },
      onError: (error: Error) => {
        setError({ message: error.message || "Failed to create employee" });
      },
    });

  const { mutate: updateEmployeeRequest, isPending: loadingUpdateEmployee } =
    useUpdateEmployee({
      onSuccess: (data: Partial<Employee>) => {
        updateStoreEmployee(String(data.id), data);
        resetForm();
        closeModal();
        toast.success("Employee Updated Successfully");
      },
      onError: (error: Error) => {
        setError({ message: error.message || "Failed to update employee" });
      },
    });

  useEffect(() => {
    if (isEditing && selectedEmployee) {
      setForm({
        firstName: selectedEmployee.firstName ?? "",
        lastName: selectedEmployee.lastName ?? "",
        email: selectedEmployee.email ?? "",
        phoneNumber: selectedEmployee.phoneNumber ?? "",
        gender: selectedEmployee.gender ?? "",
        role: selectedEmployee.role ?? "",
        registeredBy: selectedEmployee.registeredBy ?? user?.id ?? "",
      });
    } else {
      resetForm();
    }
    setIsActive(selectedEmployee?.isActive || false);
  }, [isEditing, selectedEmployee, user?.id]);

  const handleChange = (field: keyof Employee, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error?.field === field) {
      setError(null);
    }
  };

  const toggleIsActive = () => {
    setIsActive(!isActive);
  };

  const resetForm = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      gender: "",
      role: "",
      registeredBy: user?.id ?? "",
    });
  };

  function validateForm(): FieldError | null {
    if (!form.firstName.trim())
      return { field: "firstName", message: "First name is required" };
    if (!form.lastName.trim())
      return { field: "lastName", message: "Last name is required" };
    if (!form.email.trim())
      return { field: "email", message: "Email is required" };
    if (!/\S+@\S+\.\S+/.test(form.email))
      return { field: "email", message: "Invalid email address" };
    if (!form.gender) return { field: "gender", message: "Gender is required" };
    if (!form.role) return { field: "role", message: "Role is required" };
    if (!form.registeredBy)
      return { field: "registeredBy", message: "Registered by is required" };
    return null;
  }

  const submitForm = async () => {
    if (authLoading || !user) {
      toast.info("Please wait until user data is loaded.");
      return;
    }

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      toast.error(validationError.message);
      return;
    }

    setError(null);
    setSuccessMsg("");
    if (isEditing && selectedEmployee.id) {
      const updatePayload: UpdateEmployee = {
        firstName: form.firstName || null,
        lastName: form.lastName || null,
        email: form.email,
        phoneNumber: form.phoneNumber || null,
        gender: form.gender || null,
        role: selectedEmployee.role || null,
        isActive,
        id: selectedEmployee.id,
      };
      updateEmployeeRequest({
        id: selectedEmployee.id,
        updates: updatePayload,
      });
      await refetch();
    } else {
      const createPayload: CreateEmployee = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        registeredBy: user.id,
        phoneNumber: form.phoneNumber || "",
        gender: form.gender,
        role: form.role,
      };
      registerEmployeeRequest(createPayload);
      await refetch();
    }
  };

  return {
    form,
    loading: loadingCreateEmployee || loadingUpdateEmployee || authLoading,
    error,
    closeModal,
    isOpen: activeModal === "create" || activeModal === "update",
    successMsg,
    handleChange,
    toggleIsActive,
    isActive,
    setIsActive,
    submitForm,
    isEditing,
  };
}
