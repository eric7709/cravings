"use client";

import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import ModalOverlay from "@/components/ModalOverlay";
import { useCustomerDetails } from "../store/useCustomerDetails";
import { TITLES } from "@/modules/Customers/constants/title";

export default function CreateCustomerModal() {
  const {
    isOpen,
    customer,
    errors,
    setField,
    closeModal,
    handleSubmit,
    isPending,
  } = useCustomerDetails();

  return (
    <ModalOverlay isOpen={isOpen} onClose={closeModal}>
      <div className="px-4 lg:px-0 w-full lg:w-96">
        <form
          onSubmit={handleSubmit}
          className=" w-full space-y-4 p-6 bg-white shadow-xl rounded-lg"
        >
          {/* Simple header */}
          <div className="text-center pb-2">
            <h2 className="text-xl font-semibold text-gray-800">
              New Customer Profile
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              We only collect this information to help you track and manage your
              customer relationships better
            </p>
          </div>

          {/* Title */}
          <Select
            label="Title"
            value={customer.title}
            onChange={(e) => setField("title", e.target.value)}
            error={errors.title}
            className="text-sm"
          >
            <option value="">Select title</option>
            {TITLES.map((title, key) => (
              <option value={title} key={key}>
                {title}
              </option>
            ))}
          </Select>

          {/* Name */}
          <Input
            label="Name"
            value={customer.name}
            onChange={(e) => setField("name", e.target.value)}
            placeholder="Enter full name"
            error={errors.name}
            inputClassName="text-sm"
            labelClassName="text-sm font-medium"
          />

          {/* Email */}
          <Input
            label="Email"
            type="email"
            value={customer.email}
            onChange={(e) => setField("email", e.target.value)}
            placeholder="Enter email"
            error={errors.email}
            inputClassName="text-sm"
            labelClassName="text-sm font-medium"
          />

          {/* Phone */}
          <Input
            label="Phone (optional)"
            type="tel"
            value={customer.phoneNumber}
            onChange={(e) => setField("phoneNumber", e.target.value)}
            placeholder="Enter phone"
            error={errors.phoneNumber}
            inputClassName="text-sm"
            labelClassName="text-sm font-medium"
          />

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={closeModal}
              disabled={isPending}
              className="flex-1 py-2.5 px-4 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 py-2.5 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
}
