"use client";
import ModalOverlay from "@/components/ModalOverlay";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { useTableForm } from "../hooks/useTableForm";

export default function TableModal() {
  const {
    form,
    errors,
    handleChange,
    handleSubmit,
    isPending,
    isCreateMode,
    isUpdateMode,
    employees,
    closeModal,
  } = useTableForm();
  return (
    <ModalOverlay isOpen={isCreateMode || isUpdateMode} onClose={closeModal}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="bg-white mx-4 p-6 rounded-xl flex flex-col gap-5 shadow-md w-[350px]"
      >
        {/* Dynamic title */}
        <p className="text-xl font-semibold">
          {isCreateMode ? "Create a Table" : "Update Table"}
        </p>

        {/* Table Name */}
        <Input
          label="Table Name"
          placeholder="Enter table name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          error={errors.name}
        />

        {/* Table Number */}
        <Input
          label="Table Number"
          type="number"
          placeholder="Enter table number"
          value={form.tableNumber}
          onChange={(e) => handleChange("tableNumber", e.target.value)}
          error={errors.tableNumber}
        />

        {/* Capacity */}
        <Input
          label="Capacity"
          type="number"
          placeholder="Enter capacity"
          value={form.capacity}
          onChange={(e) => handleChange("capacity", e.target.value)}
          error={errors.capacity}
        />

        {/* Waiter (optional) */}
        <Select
          label="Waiter (optional)"
          value={form.waiterId ?? ""}
          onChange={(e) => handleChange("waiterId", e.target.value)}
          error={errors.waiterId}
        >
          <option value="">-- No waiter assigned --</option>
          {employees.filter(el => el.role?.toLocaleLowerCase() == "waiter").map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.firstName} {emp.lastName}
            </option>
          ))}
        </Select>
        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-4 cursor-pointer bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending
            ? isCreateMode
              ? "Creating..."
              : "Updating..."
            : isCreateMode
            ? "Create Table"
            : "Update Table"}
        </button>
      </form>
    </ModalOverlay>
  );
}
