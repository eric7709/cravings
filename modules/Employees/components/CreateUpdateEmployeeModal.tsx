"use client";
import { X } from "lucide-react";
import { useCreateUpdateStaff } from "../hooks/useCreateUpdateStaff";
import ModalOverlay from "@/components/ModalOverlay";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";

export default function CreateUpdateEmployeeModal() {
  const {
    form,
    loading,
    error,
    handleChange,
    toggleIsActive,
    submitForm,
    isOpen,
    isActive,
    closeModal,
    isEditing,
  } = useCreateUpdateStaff();

  return (
    <ModalOverlay isOpen={isOpen} onClose={closeModal}>
      <div className="bg-white rounded-2xl shadow-2xl w-full sm:w-[400px] mx-4 border border-gray-200 transform transition-all duration-300">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4 bg-gray-50 rounded-t-2xl">
          <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
            {isEditing ? "Update Employee" : "Create New Employee"}
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-150 p-1 rounded-full hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <Input
            label="First Name"
            value={form.firstName || ""}
            onChange={(e) => handleChange("firstName", e.target.value)}
            error={error?.field === "firstName" ? error.message : undefined}
            className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          />
          <Input
            label="Last Name"
            value={form.lastName || ""}
            onChange={(e) => handleChange("lastName", e.target.value)}
            error={error?.field === "lastName" ? error.message : undefined}
            className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          />
          <Input
            label="Email"
            type="email"
            value={form.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            error={error?.field === "email" ? error.message : undefined}
            className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          />
          <Input
            label="Phone Number"
            value={form.phoneNumber || ""}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            error={error?.field === "phoneNumber" ? error.message : undefined}
            className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Gender"
              value={form.gender || ""}
              onChange={(e) => handleChange("gender", e.target.value)}
              options={[
                { label: "Select gender", value: "" },
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
              ]}
              error={error?.field === "gender" ? error.message : undefined}
              className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-700"
            />
            <Select
              label="Role"
              value={form.role || ""}
              onChange={(e) => handleChange("role", e.target.value)}
              options={[
                { label: "Select role", value: "" },
                { label: "Manager", value: "Manager" },
                { label: "Waiter", value: "Waiter" },
                { label: "Chef", value: "Chef" },
                { label: "Cashier", value: "Cashier" },
              ]}
              error={error?.field === "role" ? error.message : undefined}
              className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-700"
            />
          </div>
          {isEditing && (
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isActive}
                onChange={toggleIsActive}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-sm text-gray-700">Is Active</label>
            </div>
          )}
        </div>

        {error && !error.field && (
          <p className="text-red-500 text-sm px-6 mb-4">{error.message}</p>
        )}

        <div className="grid grid-cols-2 justify-end gap-3 border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-2xl">
          <button
            className="px-12 cursor-pointer duration-300 active:scale-90 py-3.5 text-sm rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-100 hover:border-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={closeModal}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-5 py-3.5 cursor-pointer duration-300 active:scale-90 rounded-lg text-sm bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={submitForm}
            disabled={loading}
          >
            {loading
              ? isEditing
                ? "Updating..."
                : "Creating..."
              : isEditing
                ? "Update Employee"
                : "Create Employee"}
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}
