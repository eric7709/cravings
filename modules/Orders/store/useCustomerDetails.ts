import { CustomerForm } from "@/modules/Customers/types/customer";
import { useState } from "react";
import { toast } from "react-toastify";
import { useOrderSelectionStore } from "./useOrderSelectionStore";
import { useGetOrCreateCustomer } from "@/modules/Customers/hooks/useCustomerSerivces";
import { saveCustomerToCookie } from "@/utils/saveCustomerToCookie";

export type CustomerErrors = Partial<Record<keyof CustomerForm, string>>;

export function useCustomerDetails() {
  const { setModal, activeModal, closeModal } = useOrderSelectionStore();
  const isOpen = activeModal === "create";
  const [customer, setCustomer] = useState<CustomerForm>({
    title: "",
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState<CustomerErrors>({});
  const { mutate: createCustomer, isPending } = useGetOrCreateCustomer();
  const resetForm = () => {
    setCustomer({ title: "", name: "", email: "", phoneNumber: "" });
    setErrors({});
  };
  const closeAndReset = () => {
    resetForm();
    closeModal();
  };
  const setField = (field: keyof CustomerForm, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };
  const validate = () => {
    const newErrors: CustomerErrors = {};
    if (!customer.title) newErrors.title = "Please select a title";
    if (!customer.name.trim()) newErrors.name = "Name is required";
    if (!customer.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      newErrors.email = "Invalid email format";
    }
    if (customer.phoneNumber) {
      if (!/^\+?[0-9]{7,15}$/.test(customer.phoneNumber)) {
        newErrors.phoneNumber = "Invalid phone number";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    createCustomer(customer, {
      onSuccess: (data) => {
        saveCustomerToCookie(data);
        setModal("summary");
        resetForm();
      },
      onError: (error: any) => {
        console.error(error);
        toast.error(error.message || "Failed to create customer");
      },
    });
  };

  return {
    isOpen,
    customer,
    errors,
    isPending,
    setField,
    activeModal,
    closeModal: closeAndReset,
    resetForm,
    validate,
    handleSubmit,
  };
}
